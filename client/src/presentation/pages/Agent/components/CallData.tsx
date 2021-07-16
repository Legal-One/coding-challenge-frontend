import { FC } from 'react';
import { Link } from 'react-router-dom';
import { tableHead } from '../constants';
import { CallDataProps } from '../types';

import { Badge, Card, Table } from '../../../components/DataDisplay';
import { selectType } from '../../../../utils';

const CallData: FC<CallDataProps> = ({ records }): JSX.Element => {
	console.log(records);
	const formatedTableHead = [...tableHead];
	formatedTableHead[4] = {
		...formatedTableHead[4],
		Cell: ({ value }: any) => {
			return <Badge text={value} type={selectType(value)} />;
		},
	};
	formatedTableHead[0] = {
		...formatedTableHead[0],
		Cell: ({ value, row }: any) => {
			return <Link to={`/call/${row.values.number}`}>{value}</Link>;
		},
	};
	return (
		<Card className="dashboard__allCalls">
			<h2>Call Frequency</h2>
			<Table tableHead={formatedTableHead} tableData={records ? records : []} />
		</Card>
	);
};

export default CallData;
