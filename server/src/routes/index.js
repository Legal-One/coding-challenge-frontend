const { Router } = require("express");
const controller = require("../controllers/controller")
const router = Router();

router.get("/get-agents", controller.getAgents);
router.get("/get-agent/:id", controller.getAgent);
router.get("/get-agent-by-number/:number", controller.getAgentByNumber);

module.exports = router;
