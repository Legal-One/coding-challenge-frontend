const express = require('express');
const controller = require('../controllers/call');

const router = express.Router();

router.get('/:number', controller.getCallById);

module.exports = router;