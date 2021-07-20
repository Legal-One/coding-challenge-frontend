import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AgentCallLogs from "../../components/AgentCallLogs";
import "./index.scss";


const apiUrl = "http://localhost:5000/api/agent/";

function Agent() {
    const { agentId } = useParams();
    
    const [agentCallLogs, setAgentCallLogs] = useState([]);

    useEffect(() => {
        const fetchAgentCallLogs = async () => {
            const response = await axios.get(apiUrl + agentId);
            setAgentCallLogs(response.data);
        };
        fetchAgentCallLogs();
    }, [agentId]);



    return (
        <div>
            <AgentCallLogs agentCallLogs = {agentCallLogs} />
        </div>
    );
}
export default Agent;


