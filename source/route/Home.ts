import { Request, Response } from 'express';

export function route(req: Request, res: Response) {
	res.render('home.njk', {locale: "en"});
}