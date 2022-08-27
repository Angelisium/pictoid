import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import { runJob } from '../../job';
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
	});
	if (user.error)
		return res.send(user.error);

	req.session.twinoidToken = twinoidToken;
	req.session.avatarUrl = user.picture?.url;
	req.session.username = user.name;
	req.session.twinoidId = user.id;

	runJob("computeUserStats", user.id, twinoidToken);

	return res.redirect("/");
}