import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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

    const [phoneNumberCallLogs, setPhoneNumberCallLogs] = useState([]);

    useEffect(() => {
        const fetchPhoneNumberCallLogs = async () => {
            const response = await axios.get(apiUrl + phoneNumber);
            setPhoneNumberCallLogs(response.data);
        };
        fetchPhoneNumberCallLogs();
    }, [phoneNumber]);

    const counter = {};
    for (var i = 0; i < phoneNumberCallLogs.length; i++) {
        const currentValue = phoneNumberCallLogs[i].resolution;
        if (counter[currentValue]) {
            counter[currentValue]++;
        } else {
            counter[currentValue] = 1;
        }
    }

    const chartData = [["Resolution", "Count"], ...Object.entries(counter)];

    return (
        <main>
            <Table headers={headers} rows={dataMapper(phoneNumberCallLogs)} />
            <Chart chartType="PieChart" chartData={chartData} />
        </main>
    );
}
export default Phone;
