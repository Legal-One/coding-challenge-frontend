const express = require('express');

const logsController = require('../controllers')

const router = express.Router()

router.get('/logs', logsController.getLogs);
router.get('/accumulated-logs', logsController.getAggregateLogs)
router.get('/agent/:id', logsController.getAgentLogs)
router.get('/calls/:number', logsController.getNumberLogs)

module.exports = router;
