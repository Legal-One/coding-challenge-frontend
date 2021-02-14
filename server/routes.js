const { Router } = require("express");
const router = Router();

// const controller = require("./controllers");

const { getAgents, getAgent, getAgentByNumber } = require("./controllers");

router.get("/agents", getAgents);

router.get("/agent/:id", getAgent);

router.get("/call/:number", getAgentByNumber);

module.exports = router;
