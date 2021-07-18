import { Column } from 'react-table';

type TableDataInterface = {
	id?: string | number;
	number: string;
	date: string;
	time: string;
	duration: string;
	resolution: string;
};

const tableHead: Array<Column<TableDataInterface>> = [
	{
		Header: 'Phone number',
		accessor: 'number',
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
		number: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '2',
		number: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '3',
		number: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '4',
		number: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '5',
		number: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '6',
		number: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '7',
		number: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
];

export { tableData, tableHead };
