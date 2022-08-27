import { Request, Response } from 'express';

export async function route(req: Request, res: Response) {
	let games = await collections.games.find().toArray();

	return res.render('home.njk', {
		locale: req.params?.locale || "fr",
		games: games.map(game => ({
			...game,
			id: game._id,
			cover: game?.infos?.[0]?.cover,
		})),
		user: req.session.twinoidId ? {
			username: req.session.username,
			avatar: req.session.avatarUrl
		} : false
	});
}