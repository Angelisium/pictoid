import { Request, Response, Router } from 'express';

const router = Router();

router.get("/oauth/login", (req: Request, res: Response) => {
    return res.send("tset")
})

export default router;