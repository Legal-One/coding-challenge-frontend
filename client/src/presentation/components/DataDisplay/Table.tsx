import { FC } from 'react';
import { useMemo } from 'react';
import { useTable, Cell } from 'react-table';

import { TableProps } from './types';

const Table: FC<TableProps> = props => {
	const { tableHead, tableData } = props;
	const columns = useMemo(
		() => [
			{
				id: 'numbering',
				Header: 'No.',
				Cell: ({ row }: Cell) => <span>{row.index}</span>,
			},
			...tableHead,
		],
		[tableHead]
	);
	const data = useMemo(() => tableData, [tableData]);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	});
	return (
		<div
			style={{
				overflowX: 'auto',
			}}
		>
			<table {...getTableProps()} className="table">
				<thead className="table__head">
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()} className="table__head--row">
							{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps()} className="table__head--data">
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()} className="table__body">
					{rows.map(row => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} className="table__body--row">
								{row.cells.map(cell => {
									return (
										<td {...cell.getCellProps()} className="table__body--data">
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
