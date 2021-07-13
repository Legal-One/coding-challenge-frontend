import { Column } from 'react-table';

type TableDataInterface = {
	id?: string | number;
	phoneNumber: string;
	date: string;
	time: string;
	duration: string;
	resolution: string;
};

const tableHead: Array<Column<TableDataInterface>> = [
	{
		Header: 'Phone number',
		accessor: 'phoneNumber',
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
		phoneNumber: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '2',
		phoneNumber: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '3',
		phoneNumber: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '4',
		phoneNumber: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '5',
		phoneNumber: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '6',
		phoneNumber: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
	{
		id: '7',
		phoneNumber: '+49151484522',
		date: '10/07/2021',
		time: '03:00 PM',
		duration: '3m 9s',
		resolution: 'needs follow up',
	},
];

export { tableData, tableHead };
