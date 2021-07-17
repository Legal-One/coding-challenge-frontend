import { render, screen, cleanup } from '@testing-library/react';

import { Table } from '../../presentation/components/DataDisplay';
import { tableHead, tableBody } from '../dummy/tableDummy';

beforeEach(() => {
	render(<Table tableHead={tableHead} tableData={tableBody} />);
});

afterEach(cleanup);

describe('Table component test', () => {
	test('Should take snapshot of table', () => {
		const { asFragment } = render(<Table tableHead={tableHead} tableData={tableBody} />);
		expect(asFragment()).toMatchSnapshot();
	});
	test('Should have table elements', () => {
		const table = screen.getByTestId('table');
		const tableHeader = screen.getByTestId('table-head');
		const tableBody = screen.getByTestId('table-body');
		const tableRow = screen.getAllByTestId('table-row');

		expect(table).toContainElement(tableHeader);
		expect(table).toContainElement(tableBody);

		expect(tableRow).not.toHaveLength(2);
		expect(tableRow).toHaveLength(8);
	});
});
