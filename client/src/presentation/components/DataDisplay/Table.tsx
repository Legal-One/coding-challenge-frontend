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
		<div>
			<table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									{...column.getHeaderProps()}
									style={{
										borderBottom: 'solid 3px red',
										background: 'aliceblue',
										color: 'black',
										fontWeight: 'bold',
									}}
								>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map(row => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return (
										<td
											{...cell.getCellProps()}
											style={{
												padding: '10px',
												border: 'solid 1px gray',
												background: 'papayawhip',
											}}
										>
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
