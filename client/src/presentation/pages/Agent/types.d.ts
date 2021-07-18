import { LogData } from '../Dashboard/types';

export interface CallDataProps {
	records: LogsInterface[] | LogData[];
}

type LogsInterface = {
	id?: string | number;
	number: string;
	agent: string;
	date: string;
	time: string;
	duration: string;
	resolution: string;
};

export type AgentData = {
	identifier: string;
	email: string;
	firstName: string;
	lastName: string;
	photo: string;
};

export interface UserInfoProps {
	data: AgentData | null;
	logs: LogData[];
}
