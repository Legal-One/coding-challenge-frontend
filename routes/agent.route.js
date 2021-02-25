const express = require('express');
const agentController = require('../controllers/agent.controller');
const rounter = express.Router();

rounter.route('/agents').get(agentController.getAll)

module.exports = rounter