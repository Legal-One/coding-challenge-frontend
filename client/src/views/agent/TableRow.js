import React from 'react';

const TableRow = (props) => {
    return (
        <tr>
            <td>{props.phoneNumber}</td>
            <td>{props.callDate} {props.callTime}</td>
            <td>{props.resolution}</td>
        </tr>
    )
}

export default TableRow;
