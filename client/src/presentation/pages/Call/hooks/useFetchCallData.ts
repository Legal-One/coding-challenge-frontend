import { useEffect, useState } from 'react';
import moment from 'moment';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher';
import formatNumber from '../../../../utils/formatNumber';

import { BASE_API } from '../../../../constants';
import { LogsInterface } from '../types';

const useFetchCallData = (number: number) => {
	const { data: logData, error: logError } = useSWR(`${BASE_API}/call/${number}`, fetcher);
	const [callRecords, setCallRecords] = useState<Array<LogsInterface>>([]);

	if (logError) console.log(logError);
	useEffect(() => {
		if (logData) {
			const allLogRecords = [...logData.data].map(log => ({
				...log,
				id: log.identifier,
				agent: `${log.firstName} ${log.lastName}`,
				date: moment(log.dateTime).calendar(),
				time: moment(log.dateTime).format('LT'),
				duration: formatNumber(log.duration),
			}));
			setCallRecords(allLogRecords);
		}
	}, [logData]);

	return { callRecords, logError };
};

export default useFetchCallData;
