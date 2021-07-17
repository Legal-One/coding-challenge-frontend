import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import CallLogTable from './CallLogTable';
import {sort} from "../../utils";

const Agent = () => {
    const { id } = useParams();
    const [errorMsg, setErrorMsg] = useState('');
    const [resolutionData, setResolutionData] = useState([]);
    const [logsData, setLogsData] = useState([]);
    const [agentsData, setAgentsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const logsJson = await axios.get(`/logs`);
            setLogsData(logsJson.data);
            const resolutionJson = await axios.get(`/resolution`);
            setResolutionData(resolutionJson.data);
            const agentsJson = await axios.get(`/agents`);
            setAgentsData(agentsJson.data);
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

    let tableData = [];

    let agentCallLogs = logsData.filter(log => log.agentIdentifier === id);
    for (let i = 0; i < agentCallLogs.length; i++) {
        let obj = {};
        let dateTime = new Date(agentCallLogs[i].dateTime);

        obj.id = i;
        obj.phoneNumber = agentCallLogs[i].number;
        obj.callDateTime = dateTime;
        obj.callDate = dateTime.toLocaleDateString();
        obj.callTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        obj.resolution = resolutionData.find(item => item.identifier === agentCallLogs[i].identifier).resolution;

        tableData.push(obj);
    }

    let sortedTableData = sort(tableData, 'callDateTime');
    const agent = agentsData.find(agent => agent.identifier === id);

    return (
        <Container>
            { errorMsg && <p>{errorMsg}</p> }
            <h1>{agent.firstName} {agent.lastName}</h1>
            <CallLogTable
                h1={'Phone Number'}
                h2={'Call date and time'}
                h3={'Resolution'}
                tableData={sortedTableData}
            />
        </Container>
    )
}

export default Agent;
