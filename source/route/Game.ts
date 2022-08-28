import i18n from 'i18n';
import { Request, Response } from 'express';
import * as models from '../model';

export async function route(req: Request, res: Response) {
	let locale = req.params.locale || "fr";
	i18n.setLocale(locale);

	const game = await collections.games.findOne({ _id: req.params.id });
	if (!game) return res.sendStatus(404);

	const stats = await collections.stats.find({ gameId: game._id }).toArray();
	const achivements = await collections.achivements.find({ gameId: game._id }).toArray();

	const achivMap: { [statId: string]: models.Achievement[] } = {}
	for (const achivement of achivements) {
		if (!achivMap[achivement.statId])
			achivMap[achivement.statId] = [];
		achivMap[achivement.statId].push(achivement);
	}

	const gameLocals = {
		...game,
		stats: stats.map(stat => ({
			...stat,
			achievement: achivMap[stat.id],
		})),
	}

	return res.render('game.njk', {
		locale,
		game: gameLocals,
		user: req.session.twinoidId ? {
			username: req.session.username,
			avatar: req.session.avatarUrl
		} : false
	});
}