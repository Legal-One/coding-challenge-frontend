const express = require('express');
const controller = require('../controllers/agent');

const router = express.Router();

router.get('/', controller.getAllAgents);
router.get('/:id', controller.getAgentById);

module.exports = router;