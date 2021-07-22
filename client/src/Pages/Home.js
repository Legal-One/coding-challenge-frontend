import React from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import Table from "../components/Table";
import Chart from "../components/Chart";
import { getFormattedTime } from "../utils/timeFormat";

import "./index.scss";

const apiUrl = "/api/call-logs";
const headers = ["Phone number", "Number of calls", "Last call details"];
const title = `Call summary`;

const dataMapper = (callLogs) => {
    return callLogs.map((callLog) => {
        return [
            <Link to={`/call/${callLog.phoneNumber}`}>
                {callLog.phoneNumber}
            </Link>,
            callLog.callCount + (callLog.callCount === 1 ? " call" : " calls"),
            <>
                <Link to={`/agent/${callLog.agentIdentifier}/${callLog.agentName}`}>
                    {callLog.agentName}
                </Link>
                &nbsp;/&nbsp;{getFormattedTime(callLog.lastCallTime)}
            </>,
        ];
    });
};

function Home() {
    const [data, isLoading, isError] = useFetchData(apiUrl);

    const chartData = [
        ["Phone number", "Call count"],
        ...data.map((cl) => [cl.phoneNumber, parseInt(cl.callCount)]),
    ];

    return (
        <main>
            {!isLoading && !isError && (
                <>
                    <Table title={title} headers={headers} rows={dataMapper(data)} />
                    <Chart chartType="BarChart" chartData={chartData} />
                </>
            )}
            {isLoading && <h3>Fetching data...</h3>}
            {isError && <h3>Error fetching data. Please refresh your page</h3>}
        </main>
    );
}
export default Home;
