import React from 'react';
import Container from 'react-bootstrap/Container';
import CallLogTable from '../../components/CallLogTable';
import {getUniqueValues, sort, lookupAgent, formatTime} from '../../utils';
import TableRow from './TableRow';

const Home = (props) => {
    const uniquePhoneNumbers = getUniqueValues(props.data.logs, 'number');
    const callCounts = (number) => props.data.logs.reduce((acc, cur) => cur.number === number ? ++acc : acc, 0);
    const tableData = [];

    const getLastCallDetails = (number) => {
        const lastCallDetails = {};
        const filteredPhoneNumbers = props.data.logs.filter(log => log.number === number);
        let lastCallTime = '';
        let lastCallAgentId = '';

        for (let i = 0; i < filteredPhoneNumbers.length; i++) {
            if (filteredPhoneNumbers[i].dateTime > lastCallTime) {
                lastCallTime = filteredPhoneNumbers[i].dateTime;
                lastCallAgentId = filteredPhoneNumbers[i].agentIdentifier;
            }
        }

        const dateObject = new Date(lastCallTime);
        const formattedTime = formatTime(dateObject);
        const lastCallAgent = lookupAgent(props.data.agents, lastCallAgentId);

        lastCallDetails.agentName = `${lastCallAgent.firstName} ${lastCallAgent.lastName}`;
        lastCallDetails.agentId = lastCallAgent.identifier;
        lastCallDetails.lastCallTime = formattedTime;

        return lastCallDetails;
    };

    for (let i = 0; i < uniquePhoneNumbers.length; i++) {
        const lastCallDetails = getLastCallDetails(uniquePhoneNumbers[i]);
        const obj = {};

        obj.id = i;
        obj.phoneNumber = uniquePhoneNumbers[i];
        obj.callCount = callCounts(uniquePhoneNumbers[i]);
        obj.agentName = lastCallDetails.agentName;
        obj.agentId = lastCallDetails.agentId;
        obj.lastCallTime = lastCallDetails.lastCallTime;
        tableData.push(obj);
    }

    const sortedTableData = sort(tableData, 'lastCallTime');

    const headings = {
        h1: 'Phone Number',
        h2: 'Number of Calls',
        h3: 'Last call details'
    }

    return (
        <Container>
            <h1>Call Logs</h1>
            <CallLogTable headings={headings}>
                <TableRow tableData={sortedTableData} />
            </CallLogTable>
        </Container>
    )
}

export default Home;
