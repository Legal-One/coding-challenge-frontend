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
                { props.tableData.map((call) =>
                    <TableRow
                        phoneNumber={call.phoneNumber}
                        callDate={call.callDate}
                        callTime={call.callTime}
                        resolution={call.resolution}
                        key={call.id}
                    />
                )}
            </tbody>
        </Table>
    )
}

export default CallLogTable;
