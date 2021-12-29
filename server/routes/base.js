const express = require('express');
const controller = require('../controllers/base');

const router = express.Router();

router.get('/', controller.getBase);

module.exports = router;