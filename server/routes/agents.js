import express from 'express';
import AgentController from '../controllers/agents';

const AgentRouter = express.Router();

AgentRouter.get(
    '/agents/:agentId',
    AgentController.getAgent
);

export default AgentRouter;
