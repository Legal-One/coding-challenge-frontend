import { Router } from 'express';

import { getAllCalls, getAgentCalls } from './controller';

const router: Router = Router();

router.get('/calls', getAllCalls);
router.get('/agent/:ID', getAgentCalls);

export default router;
