import { Router, Response, Request } from 'express';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  return res
    .json({
      message: 'pong',
    })
    .status(200);
});

export default router;
