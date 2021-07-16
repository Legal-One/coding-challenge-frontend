import { Request, Response } from 'express';
import utilityResponse from '../utils/utilityResponse';
import { IDashboardResponse, IAgentResponse } from './types';

import agents from '../../../../json-data/agents.json';
import logs from '../../../../json-data/logs.json';
import resolutions from '../../../../json-data/resolution.json';

// Get dashboard data
const getDashboardData = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
	try {
		const data: IDashboardResponse[] = getAllDashData();
		return utilityResponse({ data, message: 'Dashboard data', res, statusCode: 200 });
	} catch (err) {
		return utilityResponse({ message: err.msg, res, statusCode: 500 });
	}
};

// Get agent data
const getAgentRecords = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
	try {
		const { identifier: id } = req.params;
		if (!id) return utilityResponse({ message: 'Invalid Id', res, statusCode: 400 });

		const agentData = agents.find(agent => agent.identifier === id);

		if (!agentData) return utilityResponse({ message: 'Agent not found', res, statusCode: 404 });

		const agentLogs: IDashboardResponse[] = getAllDashData().filter(logData => logData.agentIdentifier === id);

		const data: IAgentResponse = {
			agent: agentData,
			log: agentLogs,
		};

		return utilityResponse({ data, message: 'Dashboard data', res, statusCode: 200 });
	} catch (err) {
		return utilityResponse({ message: err.msg, res, statusCode: 500 });
	}
};

const getNumberRecords = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
	try {
		const { number } = req.params;
		if (!number) return utilityResponse({ message: 'Invalid number', res, statusCode: 400 });
		const data: IDashboardResponse[] = getAllDashData().filter(log => log.number === number);
		return utilityResponse({ data, message: 'Dashboard data', res, statusCode: 200 });
	} catch (err) {
		return utilityResponse({ message: err.msg, res, statusCode: 500 });
	}
};

const getAllAgents = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
	try {
		return utilityResponse({ data: agents, message: 'All agents', res, statusCode: 200 });
	} catch (err) {
		return utilityResponse({ message: err.msg, res, statusCode: 500 });
	}
};

const getAllDashData = () => {
	const dataWithResolutionLogData: IDashboardResponse[] = logs.map(log => ({
		...resolutions.find(resolution => resolution.identifier === log.identifier),
		...agents.find(agent => agent.identifier === log.agentIdentifier),
		...log,
	}));
	return dataWithResolutionLogData;
};

export { getAllAgents, getAgentRecords, getDashboardData, getNumberRecords };
