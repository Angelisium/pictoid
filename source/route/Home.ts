import i18n from 'i18n';
import { Request, Response } from 'express';

export async function route(req: Request, res: Response) {
	let locale = req.params?.locale || "fr",
		games = await collections.games.find().toArray();

	i18n.setLocale(locale);

	return res.render('home.njk', {
		locale,
		games: games.map(game => ({
			...game,
			id: game._id,
			cover: game?.infos?.[0]?.cover || '393_b591',
		})),
		user: req.session.twinoidId ? {
			username: req.session.username,
			avatar: req.session.avatarUrl
		} : false
	});
}