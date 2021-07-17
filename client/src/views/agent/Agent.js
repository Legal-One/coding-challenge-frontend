import React from 'react';
import {useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CallLogTable from '../../components/CallLogTable';
import {sort, lookupAgent, addCommonProperties} from '../../utils';
import TableRow from './TableRow';

const Agent = (props) => {
    const { id } = useParams();
    const tableData = [];
    const agentCallLogs = props.data.logs.filter(log => log.agentIdentifier === id);

    for (let i = 0; i < agentCallLogs.length; i++) {
        const obj = addCommonProperties(agentCallLogs, i, props.data.resolution);

        obj.phoneNumber = agentCallLogs[i].number;
        tableData.push(obj);
    }

    const sortedTableData = sort(tableData, 'callDateTime');
    const agent = lookupAgent(props.data.agents, id);
    const headings = {
        h1: 'Phone Number',
        h2: 'Call date and time',
        h3: 'Resolution'
    }

    return (
        <Container>
            <h1>{agent.firstName} {agent.lastName}</h1>
            <CallLogTable headings={headings}>
                <TableRow tableData={sortedTableData} />
            </CallLogTable>
        </Container>
    )
}

export default Agent;
