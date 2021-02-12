import { Router } from 'express';

import { getAllCalls } from './controller';

const router: Router = Router();

router.get('/calls', getAllCalls);

export default router;
