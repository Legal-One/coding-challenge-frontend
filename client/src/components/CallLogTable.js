import React from 'react';
import Table from 'react-bootstrap/Table';

const CallLogTable = (props) => {

    const renderTableHeadings = () => {
        return Object.keys(props.headings)
            .map((propKey, index) =>
                <th key={index}>{props.headings[propKey]}</th>
            );
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    { renderTableHeadings() }
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </Table>
    )
}

export default CallLogTable;
