import { useEffect, useState } from 'react';
import moment from 'moment';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher';
import formatNumber from '../../../../utils/formatNumber';

import { AgentData } from '../types';
import { LogData } from '../../Dashboard/types';
import { BASE_API } from '../../../../constants';

const useFetchAgentData = (identifier: number) => {
	const { data: logData, error: logError } = useSWR(`${BASE_API}/agent/${identifier}`, fetcher);
	const [agentData, setAgentData] = useState<AgentData | null>(null);
	const [agentLogs, setAgentLogs] = useState<Array<LogData>>([]);

	if (logError) console.log(logError);
	useEffect(() => {
		if (logData) {
			const { agent, log: agentLogData } = logData.data;
			const logs = [...agentLogData].map(log => ({
				...log,
				id: log.identifier,
				agent: `${log.firstName} ${log.lastName}`,
				date: moment(log.dateTime).calendar(),
				time: moment(log.dateTime).format('LT'),
				duration: formatNumber(log.duration),
			}));
			setAgentLogs(logs);
			setAgentData(agent);
		}
	}, [logData]);

	return { agentData, agentLogs, logError };
};

export default useFetchAgentData;
