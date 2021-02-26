import express from 'express';
import LogController from '../controllers/logs';

const LogRouter = express.Router();

LogRouter.get(
    '/logs',
    LogController.getAllLogs
);

LogRouter.get(
    '/logs/:number',
    LogController.getLog
);

export default LogRouter;
