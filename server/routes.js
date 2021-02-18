"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("./controller");
var router = express_1.Router();
router.get('/calls', controller_1.getAllCalls);
router.get('/agent/:ID', controller_1.getAgentCalls);
router.get('/call/:number', controller_1.getCallDetails);
router.all('*', function (_request, res) {
    return res.status(404).json({
        status: 'error',
        message: 'Route does not exist',
    });
});
exports.default = router;
