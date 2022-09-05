import i18n from 'i18n';
import { Request, Response } from 'express';
import * as models from '../model';

export async function route(req: Request, res: Response) {
	let locale = req.session.locale || req.params.locale || "fr";
	i18n.setLocale(locale);

	const game = await collections.games.findOne({ _id: req.params.id });
	if (!game) return res.sendStatus(404);

	const user = await collections.users.findOne({ _id: req.session.twinoidId });
	const stats = await collections.stats.find({ gameId: game._id }).toArray();
	const achievements = await collections.achievements.find({ gameId: game._id }).toArray();

	const achivMap: { [statId: string]: any[] } = {}
	for (const achievement of achievements) {
		if (!achivMap[achievement.statId])
			achivMap[achievement.statId] = [];
		achivMap[achievement.statId].push({
			...achievement,
			userHas: user?.achievements?.includes(achievement._id),
		});
	}

	const gameLocals = {
		...game,
		stats: stats.map(function (stat) {
			let s: {
				achievement: any[],
				score?: number,
				icon?: string,
				name: string,
				id: string,
				description: string,
				rare: number,
				gameId: string,
				_id: string
			} = {
				...stat,
				achievement: achivMap[stat.id]
			};
			if (user?.stats) {
				s.score = user.stats.find(s => s.id === stat._id)?.score || 0;
			}
			return s;
		}),
	}

	return res.render('game.njk', {
		locale,
		game: gameLocals,
		user: req.session.twinoidId ? {
			isLoading: user?.isLoading,
			username: req.session.username,
			avatar: req.session.avatarUrl
		} : false
	});
}