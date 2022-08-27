import * as api from "../utils/api"
import * as models from "../models"

export default async (twinId: number, token: string): Promise<boolean> => {
	const user = await api.getUserInfos(token, twinId, {
		id: true,
		// contacts: { user: { id: true } },
		sites: {
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
	});
	if (user.error) {
		console.error(user);
		return false;
	}

	const existingGames: string[] = await collections.games.find({}, { projection: { _id: 1 } }).map(game => game._id).toArray();
	const existingStats: string[] = await collections.stats.find({}, { projection: { _id: 1 } }).map(stat => stat._id).toArray();
	const existingAchivements: string[] = await collections.achivements.find({}, { projection: { _id: 1 } }).map(ac => ac._id).toArray();

	// console.log(JSON.stringify(user, null, 2))

	const gamesToInsert: models.Game[] = []
	const statsToInsert: models.Stat[] = []
	const achivementsToInsert: models.Achievement[] = []

	for (const userSite of user.sites ?? []) {
		// Add missing sites 
		if (existingGames.includes(userSite.site.id.toString()))
			continue;

		gamesToInsert.push({
			_id: userSite.site.id.toString(),
			icon: userSite.site.icon.url,
			host: userSite.site.host,
			lang: userSite.site.lang,
			infos: userSite.site.infos.map(info => ({
				id: info.id.toString(),
				cover: info.cover.url,
				name: info.cover.url,
				lang: info.lang,
				description: info.description,
			})),
			status: userSite.site.status,
		})

		// Add missing stats
		for (const stat of userSite.stats ?? []) {
			const id = `${userSite.site.id}_${stat.id}`
			if (existingStats.includes(id))
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
		}

		// Add missing achievements
		for (const achievement of userSite.achievements ?? []) {
			if (existingAchivements.includes(achievement.id))
				continue;

			achivementsToInsert.push({
				_id: achievement.id,
				data: {
					type: achievement.data.type,
					title: achievement.data.title,
					prefix: achievement.data.prefix,
					suffix: achievement.data.suffix,
					url: achievement.data.url,
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
		}
	}

	// Perform db operations
	const promises: Promise<any>[] = []

	if (gamesToInsert.length > 0) {
		console.log(`Inserting ${gamesToInsert.length} games`);
		collections.games.insertMany(gamesToInsert);
	}
	if (statsToInsert.length > 0) {
		console.log(`Inserting ${statsToInsert.length} stats`);
		collections.stats.insertMany(statsToInsert);
	}
	if (achivementsToInsert.length > 0) {
		console.log(`Inserting ${achivementsToInsert.length} achievements`);
		collections.achivements.insertMany(achivementsToInsert);
	}

	await Promise.all(promises);

	return true;
}