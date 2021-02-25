const express = require('express');
const logController = require('../controllers/log.controller');
const rounter = express.Router();

rounter.route('/logs').get(logController.getAll)

module.exports = rounter