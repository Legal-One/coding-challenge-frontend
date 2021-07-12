import { tableData, tableHead } from '../constants';

import { Table } from '../../../components/DataDisplay';
const AllCalls = () => {
	return <Table tableHead={tableHead} tableData={tableData} />;
};

export default AllCalls;
