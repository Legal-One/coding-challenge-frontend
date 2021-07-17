import React from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';

const CallLogTable = (props) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>{props.h1}</th>
                    <th>{props.h2}</th>
                    <th>{props.h3}</th>
                </tr>
            </thead>
            <tbody>
                { props.tableData.map((phoneNumber) =>
                    <TableRow
                        phoneNumber={phoneNumber.phoneNumber}
                        callCount={phoneNumber.callCount}
                        agentName={phoneNumber.agentName}
                        agentId={phoneNumber.agentId}
                        lastCallTime={phoneNumber.lastCallTime}
                        key={phoneNumber.id}
                    />
                )}
            </tbody>
        </Table>
    )
}

export default CallLogTable;
