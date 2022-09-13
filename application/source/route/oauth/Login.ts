import { Request, Response } from 'express';

export async function route(req: Request, res: Response) {
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
}