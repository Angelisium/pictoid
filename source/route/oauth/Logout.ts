import { Request, Response } from 'express';

export async function route(req: Request, res: Response) {
    req.session.twinoidId = undefined;
    req.session.twinoidToken = undefined;
    req.session.username = undefined;
    req.session.avatarUrl = undefined;

    return res.redirect("/");
} 