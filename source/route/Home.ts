import { Request, Response } from 'express';

export async function route(req: Request, res: Response) {
	let locale = req.params?.locale || "all",
		games = await mongo.collection("game").find({ locale }).toArray();
	res.render('home.njk', { locale, games,
		user: req.query?.user ? {
			username: "Angelisium",
			avatar: "//imgup.motion-twin.com//twinoid/2/7/38ff77a6_696209.jpg"
		} : false
	});
}