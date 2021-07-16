import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { tableHead } from '../constants';

import { Badge, Card, Table } from '../../../components/DataDisplay';

import { selectType } from '../../../../utils';
import { Context } from '../../../../infrastructure/context';

const AllCalls: FC = (): JSX.Element => {
	const { state } = useContext<any>(Context);
	const {
		dashboardSummary: { tableData },
	} = state;

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
			return <Link to={`/call/${row.values.number}`}>{value}</Link>;
		},
	};
	formatedTableHead[1] = {
		...formatedTableHead[1],
		Cell: ({ value, row }: any) => {
			const { original } = row;
			return <Link to={`/agent/${original.agentIdentifier}`}>{value}</Link>;
		},
	};
	return (
		<Card className="dashboard__allCalls">
			<h2>All calls</h2>
			<Table tableHead={formatedTableHead} tableData={tableData ? tableData : []} />
		</Card>
	);
};

export default AllCalls;
