import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import Chart from "../components/Chart";
import { getFormattedTime } from "../utils/timeFormat";

import "./index.scss";

const apiUrl = "http://localhost:5000/api/call-logs";
const headers = ["Phone number", "Number of calls", "Last call details"];

const dataMapper = (cl) => {
    return cl.map((callLog) => {
        return [
            <Link to={`/call/${callLog.phoneNumber}`}>
                {callLog.phoneNumber}
            </Link>,
            callLog.callCount + (callLog.callCount === 1 ? " call" : " calls"),
            <>
                <Link to={`/agent/${callLog.agentIdentifier}`}>
                    {callLog.agentName}
                </Link>
                &nbsp;/&nbsp;{getFormattedTime(callLog.lastCallTime)}
            </>,
        ];
    });
};

function Home() {
    const [callLogs, setCallLogs] = useState([]);

    useEffect(() => {
        const fetchCallLogs = async () => {
            const response = await axios.get(apiUrl);
            setCallLogs(response.data);
        };
        fetchCallLogs();
    }, []);

    const chartData = [
        ["Phone number", "Call count"],
        ...callLogs.map((cl) => [cl.phoneNumber, parseInt(cl.callCount)]),
    ];

    console.log(callLogs);
    return (
        <main>
            <Table headers={headers} rows={dataMapper(callLogs)} />
            <Chart chartType="BarChart" chartData={chartData} />
        </main>
    );
}
export default Home;
