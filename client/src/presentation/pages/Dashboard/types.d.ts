import { ResolutionTypes } from '../../components/DataDisplay/types';

export interface LogData {
	agentIdentifier?: string;
	dateTime?: string;
	duration: number;
	email: string;
	firstName: string;
	identifier: string;
	lastName: string;
	number: string;
	photo: string;
	resolution: ResolutionTypes;
}

export interface LogExtendedData extends LogData {
	count: number;
	duration: string;
	agent: string;
	time: string;
}

export interface IDashFetchReturn {
	allLogs: Array<LogData>;
	dashboardData: Array<LogExtendedData>;
	logError: any;
	agentsError: any;
	totalCalls: number;
	totalCustomers: number;
	totalAgents: number;
}

export type DashboardFetchHook = () => IDashFetchReturn;
