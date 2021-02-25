const express = require('express');
const resolutionController = require('../controllers/resolution.controller');
const rounter = express.Router();

rounter.route('/resolutions').get(resolutionController.getAll)

module.exports = rounter