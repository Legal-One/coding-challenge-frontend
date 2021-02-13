import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAccumulatedLogs } from "../../api";
import "./Home.css";

const Home = () => {
  const [logs, setLogs] = useState([]);
  const fetchLogs = async () => {
    const logs = await getAccumulatedLogs();
    if (logs.length) {
      return setLogs(logs);
    }
  };

  useEffect(() => fetchLogs(), []);
  return (
    <div className="home">
      <table>
        <thead>
          <tr>
            <th>Phone number</th>
            <th>Number of calls</th>
            <th>Agent name</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.identifier}>
              <th>
                <Link to={`/call/${log.number}`}>{log.number}</Link>
              </th>
              <th>{log.count}</th>
              <th className="agent-name">
                <Link to={`/agent/${log.agent.identifier}`}>
                  {" "}
                  {log.agent.firstName} {log.agent.lastName}
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
