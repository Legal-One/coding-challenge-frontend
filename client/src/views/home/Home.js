import React, {useEffect, useState} from 'react';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import CallLogTable from './CallLogTable';
import {getUniqueValues, sort} from '../../utils';

const Home = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [agentsData, setAgentsData] = useState([]);
    const [logsData, setLogsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const agentsJson = await axios.get(`/agents`);
            setAgentsData(agentsJson.data);
            const logsJson = await axios.get(`/logs`);
            setLogsData(logsJson.data);
            setIsLoading(false);
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    const uniquePhoneNumbers = getUniqueValues(logsData, 'number');
    const callCounts = (number) => logsData.reduce((acc, cur) => cur.number === number ? ++acc : acc, 0);
    const getLastCallDetails = (number) => {
        let filteredArray = logsData.filter(log => log.number === number);
        let lastCallTime = '';
        let lastCallAgentId = '';
        let lastCallDetails = {};

        // find the most recent call log time and agent id
        for (let i = 0; i < filteredArray.length; i++) {
            if (filteredArray[i].dateTime > lastCallTime) {
                lastCallTime = filteredArray[i].dateTime;
                lastCallAgentId = filteredArray[i].agentIdentifier;
            }
        }

        // convert the time
        let dateObject = new Date(lastCallTime);
        let formattedTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // look up agent
        let lastCallAgent = agentsData.find(agent => agent.identifier === lastCallAgentId);

        lastCallDetails.agentName = `${lastCallAgent.firstName} ${lastCallAgent.lastName}`;
        lastCallDetails.agentId = lastCallAgent.identifier;
        lastCallDetails.lastCallTime = formattedTime;

        return lastCallDetails;
    };

    let tableData = [];
    for (let i = 0; i < uniquePhoneNumbers.length; i++) {
        let lastCallDetails = getLastCallDetails(uniquePhoneNumbers[i]);
        let obj = {};

        obj.id = i;
        obj.phoneNumber = uniquePhoneNumbers[i];
        obj.callCount = callCounts(uniquePhoneNumbers[i]);
        obj.agentName = lastCallDetails.agentName;
        obj.agentId = lastCallDetails.agentId;
        obj.lastCallTime = lastCallDetails.lastCallTime;
        tableData.push(obj);
    }

    let sortedTableData = sort(tableData, 'lastCallTime');

    return (
        <Container>
            { errorMsg && <p>{errorMsg}</p> }
            <CallLogTable
             h1={'Phone Number'}
             h2={'Number of Calls'}
             h3={'Last call details'}
             tableData={sortedTableData}
            />
        </Container>
    )
}

export default Home;
