import React from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/fetchHook";
import Table from "../components/Table";
import Chart from "../components/Chart";
import { getFormattedDateTime } from "../utils/timeFormat";
import "./index.scss";

const apiUrl = "http://localhost:5000/api/call/";
const headers = ["Agent Name", "Call date and time", "Resolution"];

const dataMapper = (phoneLogs) => {
    return phoneLogs.map((phoneLog) => [
        phoneLog.agentName,
        getFormattedDateTime(phoneLog.callTime),
        phoneLog.resolution,
    ]);
};

function Phone() {
    const { phoneNumber } = useParams();
    const title = `Call history for ${phoneNumber}`;
    const [data, isLoading, isError] = useFetchData(apiUrl + phoneNumber);

    const counter = data.reduce((acc, cur) => {
        if (acc[cur.resolution]) {
            acc[cur.resolution]++;
        } else {
            acc[cur.resolution] = 1;
        }
        return acc;
    }, {});

    const chartData = [["Resolution", "Count"], ...Object.entries(counter)];

    return (
        <main>
            {!isLoading && !isError && (
                <>
                    <Table title={title} headers={headers} rows={dataMapper(data)} />
                    <Chart chartType="PieChart" chartData={chartData} />
                </>
            )}
            {isLoading && <h3>Fetching data...</h3>}
            {isError && <h3>Error fetching data. Please refresh your page</h3>}
        </main>
    );
}
export default Phone;
