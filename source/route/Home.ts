import i18n from 'i18n';
import { Request, Response } from 'express';

export async function route(req: Request, res: Response) {
	let locale = req.params?.locale || "fr";
	let games = await collections.games.find().toArray();
	let user = await collections.users.findOne({ _id: req.session.twinoidId }, { projection: { isLoading: 1, games: 1 } });

	i18n.setLocale(locale);

	return res.render('home.njk', {
		locale,
		games: games.map(game => ({
			...game,
			id: game._id,
			cover: game?.infos?.[0]?.cover || '393_b591',
			stat: 0,
			achievement: 0,
			player: 0,
			// score: 694,
			score: Math.round((user?.games?.find(g => g.id === game._id)?.npoints || 0) * 2) / 2, // TODO: this is user score
		})),
		user: req.session.twinoidId ? {
			isLoading: user?.isLoading,
			username: req.session.username,
			avatar: req.session.avatarUrl,
		} : false
	});
}