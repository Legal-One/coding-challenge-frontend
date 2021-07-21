import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/fetchHook";
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
    const [data, isLoading, isError] = useFetchData(apiUrl);

    const chartData = [
        ["Phone number", "Call count"],
        ...data.map((cl) => [cl.phoneNumber, parseInt(cl.callCount)]),
    ];

    return (
        <main>
            {!isLoading && (
                <>
                    <Table headers={headers} rows={dataMapper(data)} />
                    <Chart chartType="BarChart" chartData={chartData} />
                </>
            )}
            {isLoading && <h3>Fetching data...</h3>}
            {isError && <h3>Error fetching data. Please refresh your page</h3>}
        </main>
    );
}
export default Home;
