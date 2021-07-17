import React, {useEffect, useState} from 'react';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import CallLogTable from '../components/CallLogTable';
import {getUniqueValues, sort} from '../utils';

const Home = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [agents, setAgents] = useState([]);
    const [logs, setLogs] = useState([]);

    const getData = async () => {
        try {
            const agentsJson = await axios.get(`/agents`);
            setAgents(agentsJson.data);
            const logsJson = await axios.get(`/logs`);
            setLogs(logsJson.data);
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const uniquePhoneNumbers = getUniqueValues(logs, 'number');
    const callCounts = (number) => logs.reduce((acc, cur) => cur.number === number ? ++acc : acc, 0);
    const getLastCallDetails = (number) => {
        let filteredArray = [];
        let lastCallTime = '';
        let lastCallAgentId = '';
        let lastCallDetails = {};

        // filter the logs for the phone number
        for (let i = 0; i < logs.length; i++) {
            filteredArray = logs.filter(log => log.number === number);
        }

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
        let lastCallAgent = agents.find(agent => agent.identifier === lastCallAgentId);

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
