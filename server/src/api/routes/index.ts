import { Router } from 'express';
import { getAllAgents, getAgentRecords, getDashboardData, getNumberRecords } from '../controllers';

const router: Router = Router();

router.get('/', getDashboardData);
router.get('/agents', getAllAgents);
router.get('/agent/:identifier', getAgentRecords);
router.get('/call/:number', getNumberRecords);

export default router;
