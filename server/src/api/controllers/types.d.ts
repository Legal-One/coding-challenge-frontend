export interface IDashboardResponse {
	identifier: string;
	resolution?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	photo?: string | null;
	agentIdentifier: string;
	number: string;
	dateTime: string;
	duration: number;
}

export interface IAgentData {
	identifier?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	photo?: string | null;
}

export interface IAgentResponse {
	agent: IAgentData;
	log: IDashboardResponse[];
}
