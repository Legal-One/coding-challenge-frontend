import React from 'react';
import { Link } from 'react-router-dom';

const TableRow = (props) => {
    return (
        <tr>
            <td><Link to={`/call/${props.phoneNumber}`}>{props.phoneNumber}</Link></td>
            <td>{props.callCount}</td>
            <td><Link to={`/agent/${props.agentId}`}>{props.agentName}</Link> / {props.lastCallTime}</td>
        </tr>
    )
}

export default TableRow;
