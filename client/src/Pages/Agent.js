import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/fetchHook";
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
    const [data, isLoading, isError] = useFetchData(apiUrl + agentId);

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
            {!isLoading && (
                <>
                    <Table headers={headers} rows={dataMapper(data)} />
                    <Chart chartType="PieChart" chartData={chartData} />
                </>
            )}
            {isLoading && <h3>Fetching data...</h3>}
            {isError && <h3>Error fetching data. Please refresh your page</h3>}
        </main>
    );
}
export default Agent;
