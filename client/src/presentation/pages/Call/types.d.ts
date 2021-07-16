export interface CallDataProps {
	records: LogsInterface[];
}

type LogsInterface = {
	id?: string | number;
	agent: string;
	date: string;
	time: string;
	duration: string;
	resolution: string;
};
