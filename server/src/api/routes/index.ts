import { Router } from 'express';
import { getAgentRecords, getDashboardData, getNumberRecords } from '../controllers';

const router: Router = Router();

router.get('/', getDashboardData);
router.get('/agent/:id', getAgentRecords);
router.get('/call/:number', getNumberRecords);

export default router;
