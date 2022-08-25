import { Request, Response, Router } from 'express';
import * as api from '../utils/api';

const router = Router();

router.get("/login", (req: Request, res: Response) => {
	if (!process.env.CLIENT_ID) throw new Error("Missing CLIENT_ID");
	if (!process.env.CLIENT_SECRET) throw new Error("Missing CLIENT_SECRET");

	const redirect = new URL("https://twinoid.com/oauth/auth");
	redirect.searchParams.set("client_id", process.env.CLIENT_ID!);
	redirect.searchParams.set("response_type", "code");
	redirect.searchParams.set("redirect_uri", process.env.APP_URL + "/oauth/callback");
	redirect.searchParams.set("scope", "contacts");
	redirect.searchParams.set("access_type", "offline");
	redirect.searchParams.set("state", "");

	return res.redirect(redirect.toString());
})

router.get("/callback", async (req: Request, res: Response) => {
	const code = req.query.code?.toString();
	if (!code) return res.send("code query parameter is missing");

	const twinoidToken = await api.getToken(code);
	if (!twinoidToken) return res.send("Error while getting token");

	const user = await api.getBasicInfos(twinoidToken);
	if (user.error)
		return res.send(user.error);

	req.session.twinoidToken = twinoidToken;
	req.session.avatarUrl = user.picture?.url;
	req.session.username = user.name;
	req.session.twinoidId = user.id;

	return res.redirect("/");
})

export default router;