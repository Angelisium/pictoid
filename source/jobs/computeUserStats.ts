import * as api from "../utils/api";
import * as models from "../model";
import { Fields, SiteUser, User } from "../utils/apiTypes";

function computeMissingUser(
	user: User,
	existingGames: Set<string>,
	existingStats: Set<string>,
	existingachievements: Set<string>,
	gamesToInsert: models.Game[],
	statsToInsert: models.Stat[],
	achievementsToInsert: models.Achievement[],
): void {
	for (const userSite of user.sites ?? []) {
		if (!userSite.site.name) continue; // If site doesn't have name, skip it
		// Add missing sites 
		if (!existingGames.has(userSite.site.id.toString())) {
			gamesToInsert.push({
				_id: userSite.site.id.toString(),
				icon: userSite.site.icon?.url,
				host: userSite.site.host,
				lang: userSite.site.lang,
				name: userSite.site.name,
				infos: userSite.site.infos?.map((info) => ({
					id: info.id.toString(),
					cover: info.cover?.url?.split(/\/|\./).slice(-2, -1)?.[0] || '393_b591',
					lang: info.lang,
					description: info.description
				})),
				status: userSite.site.status,
			});
			existingGames.add(userSite.site.id.toString());
		}

		// Add missing stats
		for (const stat of userSite.stats ?? []) {
			const id = `${userSite.site.id}_${stat.id}`
			if (existingStats.has(id))
				continue;

			statsToInsert.push({
				_id: id,
				id: stat.id,
				name: stat.name,
				icon: typeof stat.icon === "string" ? stat.icon : stat.icon?.url,
				description: stat.description,
				rare: stat.rare,

				gameId: userSite.site.id.toString(),
			});
			existingStats.add(id);
		}

		// Add missing achievements
		for (const achievement of userSite.achievements ?? []) {
			if (existingachievements.has(achievement.id))
				continue;

			achievementsToInsert.push({
				_id: achievement.id,
				data: {
					type: achievement.data.type,
					title: achievement.data.title,
					prefix: achievement.data.prefix,
					suffix: achievement.data.suffix,
					url: achievement.data?.url,
				},
				name: achievement.name,
				npoints: achievement.npoints,
				points: achievement.points,
				description: achievement.description,
				score: achievement.score,
				index: achievement.index,

				gameId: userSite.site.id.toString(),
				statId: achievement.stat,
			});
			existingachievements.add(achievement.id);
		}
	}
}

function computeAchievements(user: User) {
	const achievements: string[] = [];
	const stats: { id: string, score: number }[] = [];
	const games: { id: string, npoints: number }[] = []
	for (const userSite of user.sites ?? []) {
		if (!userSite.site.name) continue; // If site doesn't have name, skip it

		for (const stat of userSite.stats ?? []) {
			const id = `${userSite.site.id}_${stat.id}`
			stats.push({
				id: id,
				score: stat.score,
			});
		}

		const game = {
			id: userSite.site.id.toString(),
			npoints: 0,
		}
		for (const achievement of userSite.achievements ?? []) {
			achievements.push(achievement.id);
			game.npoints += achievement.npoints;
		}
		games.push(game);
	}
	return { stats, achievements, games };
}

export default async (twinId: number, token: string): Promise<boolean> => {
	const siteFields: Fields<SiteUser> = {
		realId: true,
		site: {
			id: true,
			host: true,
			icon: true,
			name: true,
			lang: true,
			infos: {
				id: true,
				cover: true,
				lang: true,
				icons: true,
				tagLine: true,
				description: true,
			}
		},
		link: true,
		stats: {
			id: true,
			score: true,
			name: true,
			icon: true,
			description: true,
			rare: true,
			social: true
		},
		achievements: {
			id: true,
			name: true,
			stat: true,
			score: true,
			points: true,
			npoints: true,
			description: true,
			data: true,
			date: true,
			index: true,
		},
		points: true,
		npoints: true,
	}
	const user = await api.getUserInfos(token, twinId, {
		id: true,
		name: true,
		locale: true,
		picture: true,
		contacts: {
			user: { sites: siteFields }
		},
		sites: siteFields
	});
	if (user.error) {
		console.error(user);
		return false;
	}

	const existingGames: Set<string> = new Set(await collections.games.find({}, { projection: { _id: 1 } }).map(game => game._id).toArray());
	const existingStats: Set<string> = new Set(await collections.stats.find({}, { projection: { _id: 1 } }).map(stat => stat._id).toArray());
	const existingachievements: Set<string> = new Set(await collections.achievements.find({}, { projection: { _id: 1 } }).map(ac => ac._id).toArray());

	const gamesToInsert: models.Game[] = []
	const statsToInsert: models.Stat[] = []
	const achievementsToInsert: models.Achievement[] = []

	computeMissingUser(user, existingGames, existingStats, existingachievements, gamesToInsert, statsToInsert, achievementsToInsert);
	for (const contact of user.contacts ?? []) {
		computeMissingUser(contact.user, existingGames, existingStats, existingachievements, gamesToInsert, statsToInsert, achievementsToInsert);
	}
	const userStats: {
		achievements: Array<string>,
		stats: Array<{ id: string, score: number }>,
		games: Array<{ id: string, npoints: number }>,
	} = computeAchievements(user);


	// Perform db operations
	const promises: Promise<any>[] = []

	if (gamesToInsert.length > 0) {
		console.log(`Inserting ${gamesToInsert.length} games`);
		await collections.games.insertMany(gamesToInsert);
	}
	if (statsToInsert.length > 0) {
		console.log(`Inserting ${statsToInsert.length} stats`);
		await collections.stats.insertMany(statsToInsert);
	}
	if (achievementsToInsert.length > 0) {
		console.log(`Inserting ${achievementsToInsert.length} achievements`);
		await collections.achievements.insertMany(achievementsToInsert);
	}

	console.log(`Updating user achievements and stats`);
	await collections.users.updateOne({ _id: user.id }, {
		$set: {
			_id: user.id,
			name: user.name,
			picture: user.picture?.url,
			locale: user.locale,
			isLoading: false,
			...userStats,
		}
	}, { upsert: true })

	await Promise.all(promises);

	return true;
}