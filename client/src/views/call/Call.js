import React, {useEffect, useState} from 'react';
import CallLogTable from "./CallLogTable";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import axios from "axios";
import {sort} from "../../utils";

const Call = () => {
    const { number } = useParams();
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

    let numberCallLogs = logsData.filter(log => log.number === number);
    for (let i = 0; i < numberCallLogs.length; i++) {
        let obj = {};
        let dateTime = new Date(numberCallLogs[i].dateTime);

        // look up agent
        let agent = agentsData.find(agent => agent.identifier === numberCallLogs[i].agentIdentifier);

        obj.id = i;
        obj.agentName = `${agent.firstName} ${agent.lastName}`;
        obj.agentId = agent.identifier;
        obj.callDateTime = dateTime;
        obj.callDate = dateTime.toLocaleDateString();
        obj.callTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        obj.resolution = resolutionData.find(item => item.identifier === numberCallLogs[i].identifier).resolution;

        tableData.push(obj);
    }

    let sortedTableData = sort(tableData, 'callDateTime');

    return (
        <Container>
            { errorMsg && <p>{errorMsg}</p> }
            <h1>{number}</h1>
            <CallLogTable
                h1={'Agent Name'}
                h2={'Call date and time'}
                h3={'Resolution'}
                tableData={sortedTableData}
            />
        </Container>
    )
}

export default Call;
