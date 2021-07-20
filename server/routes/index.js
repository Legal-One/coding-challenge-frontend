const express = require('express');
const agentController = require('../controller/agentController');
const callLogsController = require('../controller/callLogController');
const callDetailsController = require('../controller/callDetailController');
const router = express.Router();

const BASE_PATH = '/api/';

const CALL_LOGS = BASE_PATH + 'call-logs';
const AGENT_DETAILS = BASE_PATH + 'agent/:agentId';
const CALL_DETAILS = BASE_PATH + 'call/:phoneNumber';

router.get(CALL_LOGS, callLogsController.getCallLogs);
router.get(AGENT_DETAILS, agentController.getAgentData);
router.get(CALL_DETAILS, callDetailsController.getCallDetails);

module.exports = router;
