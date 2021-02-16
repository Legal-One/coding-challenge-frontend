import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { getAccumulatedLogs } from "../../api";
import bars from "../../assets/bars.svg";
import table from "../../assets/table.svg";
import "./Home.css";

const Home = () => {
  const [logs, setLogs] = useState([]);
  const fetchLogs = async () => {
    const logs = await getAccumulatedLogs();
    if (logs.length) {
      return setLogs(logs);
    }
  };

  const data = {
    labels: logs.map((log) => log.number),
    datasets: [
      {
        label: "calls",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        order: 0,
        data: logs.map((log) => log.count),
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const toggleChart = () => {
    setShowChart(true);
    setShowTable(false);
  };

  const toggleTable = () => {
    setShowChart(false);
    setShowTable(true);
  };

  useEffect(() => fetchLogs(), []);
  return (
    <div className="home">
      <div className="icons">
        <img onClick={toggleTable} className="Logo" src={table} alt="callog" />
        <img onClick={toggleChart} className="Logo" src={bars} alt="callog" />
      </div>
      {showChart && <Bar data={data} options={options} />}
      {showTable && (
        <div className="table-holder">
          <table>
            <thead>
              <tr>
                <th>Phone number</th>
                <th>Number of calls</th>
                <th>Last call details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.identifier}>
                  <th>
                    <Link to={`/call/${log.number}`}>{log.number}</Link>
                  </th>
                  <th>{log.count} calls</th>
                  <th className="agent-name">
                    <Link to={`/agent/${log.agent.identifier}`}>
                      {log.agent.firstName} {log.agent.lastName} /{" "}
                      {log.dateTime.slice(11, 16)}
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
