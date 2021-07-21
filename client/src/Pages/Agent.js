import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import Chart from "../components/Chart";
import { getFormattedDateTime } from "../utils/timeFormat";
import "./index.scss";

const apiUrl = "http://localhost:5000/api/agent/";
const headers = ["Phone number", "Call date and time", "Resolution"];

const dataMapper = (agentData) => {
    return agentData.map((agent) => {
        return [
            agent.phoneNumber,
            getFormattedDateTime(agent.callTime),
            agent.resolution,
        ];
    });
};

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

    const counter = {};
    for (var i = 0; i < agentCallLogs.length; i++) {
        const currentValue = agentCallLogs[i].resolution;
        if (counter[currentValue]) {
            counter[currentValue]++;
        } else {
            counter[currentValue] = 1;
        }
    }

    const chartData = [["Resolution", "Count"], ...Object.entries(counter)];

    return (
        <main>
            <Table
                headers={headers}
                rows={dataMapper(agentCallLogs)}
            />

            <Chart chartType="PieChart" chartData={chartData} />
        </main>
    );
}
export default Agent;
