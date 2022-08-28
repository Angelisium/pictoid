import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import { runJob } from '../../job';
import * as api from '../../utils/api';

const datesAreOnSameDay = (first: Date, second: Date) =>
	first.getFullYear() === second.getFullYear() &&
	first.getMonth() === second.getMonth() &&
	first.getDate() === second.getDate();

export async function route(req: Request, res: Response) {
	const code = req.query.code?.toString();
	if (!code) return res.send("code query parameter is missing");

	const twinoidToken = await api.getToken(code);
	if (!twinoidToken) return res.send("Error while getting token");

	// Fast API call to login user
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

	const dbUser = await collections.users.findOne({ _id: user.id }, { projection: { _id: 1, lastUpdated: 1 } });

	if (dbUser?.lastUpdated) { // If user already update his stats today, don't update again
		const lastUpdated = new Date(dbUser.lastUpdated);
		if (datesAreOnSameDay(lastUpdated, new Date())) {
			return res.redirect("/");
		}
	}

	await collections.users.updateOne({ _id: user.id }, {
		$set: {
			_id: user.id,
			name: user.name,
			picture: user.picture?.url,
			isLoading: true,
			lastUpdated: Date.now(),
		}
	}, { upsert: true });

	runJob("computeUserStats", user.id, twinoidToken);

	return res.redirect("/");
}