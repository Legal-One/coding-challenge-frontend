import { FC } from 'react';
import { Link } from 'react-router-dom';
import { tableData, tableHead } from '../constants';

import { Badge, Card, Table } from '../../../components/DataDisplay';

import { selectType } from '../../../../utils';

const AllCalls: FC = () => {
	const formatedTableHead = [...tableHead];
	formatedTableHead[5] = {
		...formatedTableHead[5],
		Cell: ({ value }: any) => {
			return <Badge text={value} type={selectType(value)} />;
		},
	};
	formatedTableHead[0] = {
		...formatedTableHead[0],
		Cell: ({ value, row }: any) => {
			return <Link to={`/call/${row.id}`}>{value}</Link>;
		},
	};
	formatedTableHead[1] = {
		...formatedTableHead[1],
		Cell: ({ value, row }: any) => {
			return <Link to={`/agent/${row.id}`}>{value}</Link>;
		},
	};
	return (
		<Card className="dashboard__allCalls">
			<h2>Call Frequency</h2>
			<Table tableHead={formatedTableHead} tableData={tableData} />
		</Card>
	);
};

export default AllCalls;
