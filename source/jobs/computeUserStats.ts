import * as api from "../utils/api"

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

	const existingGames = await collections.games.find({}, { projection: { _id: 0, id: 1 } }).map(game => game.id).toArray();

	// console.log(JSON.stringify(user, null, 2))

	// Add missing sites 
	for (const userSite of user.sites) {
		for (const siteInfo of userSite.site.infos) {
			if (existingGames.includes(userSite.site.id))
				continue;

			await collections.games.insertOne({
				id: siteInfo.id,
				host: userSite.site.host,
				icon: userSite.site.icon.url,
				cover: siteInfo.cover.url,
				name: userSite.site.name,
				lang: siteInfo.lang,
				status: userSite.site.status,
				description: siteInfo.description,
			});
		}
	}

	return true;
}