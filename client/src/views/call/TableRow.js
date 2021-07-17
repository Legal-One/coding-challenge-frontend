import React from 'react';
import { Link } from 'react-router-dom';

const TableRow = (props) => {
    return (
        <tr>
            <td><Link to={`/agent/${props.agentId}`}>{props.agentName}</Link></td>
            <td>{props.callDate} {props.callTime}</td>
            <td>{props.resolution}</td>
        </tr>
    )
}

export default TableRow;
