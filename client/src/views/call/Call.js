import React from 'react';
import CallLogTable from '../../components/CallLogTable';
import TableRow from './TableRow';
import Container from 'react-bootstrap/Container';
import {useParams} from "react-router-dom";
import {sort, lookupAgent, addCommonProperties} from '../../utils';

const Call = (props) => {
    const { number } = useParams();
    const tableData = [];
    const numberCallLogs = props.data.logs.filter(log => log.number === number);

    for (let i = 0; i < numberCallLogs.length; i++) {
        const obj = addCommonProperties(numberCallLogs, i, props.data.resolution);
        const agent = lookupAgent(props.data.agents, numberCallLogs[i].agentIdentifier);

        obj.agentName = `${agent.firstName} ${agent.lastName}`;
        obj.agentId = agent.identifier;
        tableData.push(obj);
    }

    const sortedTableData = sort(tableData, 'callDateTime');

    const headings = {
        h1: 'Agent Name',
        h2: 'Call date and time',
        h3: 'Resolution'
    }

    return (
        <Container>
            <h1>{number}</h1>
            <CallLogTable headings={headings}>
                <TableRow tableData={sortedTableData} />
            </CallLogTable>
        </Container>
    )
}

export default Call;
