import { Column } from 'react-table';

type TableDataInterface = {
	id?: string | number;
	agent: string;
	date: string;
	time: string;
	duration: string;
	resolution: string;
};

const tableHead: Array<Column<TableDataInterface>> = [
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
];

const tableData: TableDataInterface[] = [
	{
		id: '1',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '2',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '3',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '4',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '5',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '6',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '7',
		agent: 'Abraham Ellis',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
];

export { tableData, tableHead };
