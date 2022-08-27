import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import * as api from '../../utils/api';

export async function route(req: Request, res: Response) {
	const code = req.query.code?.toString();
	if (!code) return res.send("code query parameter is missing");

	const twinoidToken = await api.getToken(code);
	if (!twinoidToken) return res.send("Error while getting token");

	const user = await api.getUserInfos(twinoidToken, undefined, {
		id: true,
		name: true,
		picture: true,
		contacts: {
			user: {
				id: true,
			}
		},
		sites: {
			realId: true,
			site: {
				id: true,
			},
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
	if (user.error)
		return res.send(user.error);

	req.session.twinoidToken = twinoidToken;
	req.session.avatarUrl = user.picture?.url;
	req.session.username = user.name;
	req.session.twinoidId = user.id;

	return res.redirect("/");
}