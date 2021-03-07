import { Router, Request, Response } from 'express';

import { getAllCalls, getAgentCalls, getCallDetails } from './controller';

const router: Router = Router();

router.get('/calls', getAllCalls);
router.get('/agent/:ID', getAgentCalls);
router.get('/call/:number', getCallDetails);

router.all('*', (_request: Request, res: Response) =>
  res.status(404).json({
    status: 'error',
    message: 'Route does not exist',
  })
);

export default router;
