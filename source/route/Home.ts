import { Request, Response } from 'express';

export async function route(req: Request, res: Response) {
	let locale = "en",
		games = await mongo.collection("game").find({ locale }).toArray();
	res.render('home.njk', { locale, games });
}