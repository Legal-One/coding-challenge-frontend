import { Router } from 'express';

import { getAllCalls, getAgentCalls, getCallDetails } from './controller';

const router: Router = Router();

router.get('/calls', getAllCalls);
router.get('/agent/:ID', getAgentCalls);
router.get('/call/:number', getCallDetails);

export default router;
