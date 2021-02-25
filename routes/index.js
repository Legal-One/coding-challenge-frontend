const express = require('express');
const agentRoute = require('./agent.route');
const logRoute = require('./log.route');
const resolutionRoute = require('./resolution.route');
const router = express.Router()
router.use('/',agentRoute)
router.use('/',logRoute)
router.use('/',resolutionRoute)
module.exports = router