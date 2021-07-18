import { Column } from 'react-table';
import { AgentIcon, CallIcon, CustomerIcon } from '../../../assets/SVG';
import { StatsCardProps } from '../../components/Common/types';

type TableDataInterface = {
	id?: string | number;
	number: string;
	agent: string;
	date: string;
	time: string;
	duration: string;
	resolution: string;
	count: string;
};

const summaryData: StatsCardProps[] = [
	{
		Icon: CallIcon,
		title: 'Total Calls',
		value: 28,
	},
	{
		Icon: AgentIcon,
		title: 'Total Agents',
		value: 10,
	},
	{
		Icon: CustomerIcon,
		title: 'Total Customers',
		value: 5,
	},
];

const tableHead: Array<Column<TableDataInterface>> = [
	{
		Header: 'Phone number',
		accessor: 'number',
	},
	{
		Header: 'Agent',
		accessor: 'agent',
	},
	{
		Header: 'Date',
		accessor: 'date',
	},
	{
		Header: 'Time',
		accessor: 'time',
	},
	{
		Header: 'Duration',
		accessor: 'duration',
	},
	{
		Header: 'Resolution',
		accessor: 'resolution',
	},
	{
		Header: 'Calls',
		accessor: 'count',
	},
];

const tableData: TableDataInterface[] = [
	{
		id: '1',
		number: '+49151484522',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
		count: '13',
	},
	{
		id: '2',
		number: '+49151484522',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
		count: '13',
	},
	{
		id: '3',
		number: '+49151484522',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
		count: '13',
	},
	{
		id: '4',
		number: '+49151484522',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
		count: '13',
	},
	{
		id: '5',
		number: '+49151484522',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
		count: '13',
	},
	{
		id: '6',
		number: '+49151484522',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
		count: '13',
	},
	{
		id: '7',
		number: '+49151484522',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
		count: '13',
	},
];

export { summaryData, tableData, tableHead };
