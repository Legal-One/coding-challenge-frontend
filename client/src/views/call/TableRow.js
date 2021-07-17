import React from 'react';
import { Link } from 'react-router-dom';

const TableRow = (props) => {
    return (
        <>
            { props.tableData.map((row, index) =>
                <tr key={index}>
                    <td><Link to={`/agent/${row.agentId}`}>{row.agentName}</Link></td>
                    <td>{row.callDate} {row.callTime}</td>
                    <td>{row.resolution}</td>
                </tr>
            )}
        </>
    )
}

export default TableRow;
