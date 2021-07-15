import { useEffect, useState } from 'react';
import moment from 'moment';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher';
import formatNumber from '../../../../utils/formatNumber';

const BASE_API = 'http://localhost:5000';

const useFetchDashboardData = () => {
	const { data: logData, error: logError } = useSWR(`${BASE_API}`, fetcher);
	const { data: agentsData, error: agentsError } = useSWR(`${BASE_API}/agents`, fetcher);
	const [dashboardData, setDashboardData] = useState<Array<object>>([]);
	const [allLogs, setAllLogs] = useState<Array<object>>([]);
	const [totalCalls, setTotalCalls] = useState<number>(0);
	const [totalCustomers, setTotalCustomers] = useState<number>(0);
	const [totalAgents, setTotalAgents] = useState<number>(0);

	if (logError || agentsError) console.log(logError | agentsError);
	useEffect(() => {
		if (logData) {
			const allLogData = [...logData.data].map(log => ({
				...log,
				id: log.identifier,
			}));

			const uniqueNumbers = [...new Set(allLogData.map(item => item.number))];
			const transformedLogs = uniqueNumbers.map(num => {
				const logNumber = allLogData.filter(log => log.number === num);
				const count = logNumber.length;
				const lastRecord = logNumber[count - 1];
				lastRecord.agent = `${lastRecord.firstName} ${lastRecord.lastName}`;
				lastRecord.date = moment(lastRecord.dateTime).calendar();
				lastRecord.time = moment(lastRecord.dateTime).format('LT');
				lastRecord.duration = formatNumber(lastRecord.duration);
				return { ...lastRecord, count };
			});
			setDashboardData(transformedLogs);
			setTotalCalls(allLogData.length);
			setTotalCustomers(transformedLogs.length);
			setAllLogs(allLogData);
		}
	}, [logData]);
	useEffect(() => {
		if (agentsData) {
			setTotalAgents(agentsData.data.length);
		}
	}, [agentsData]);

	return { allLogs, dashboardData, logError, agentsError, totalCalls, totalCustomers, totalAgents };
};

export default useFetchDashboardData;
