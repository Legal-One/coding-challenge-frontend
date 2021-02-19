const express = require("express");

const callController = require("../controllers/call");
const agentController = require("../controllers/agent");

const router = express.Router();

router.get("/calls", callController.getCalls);

router.get("/call/:number", callController.getCallsByNumber);

router.get("/agent/:agentID", agentController.getCallsByAgent);

module.exports = router;
