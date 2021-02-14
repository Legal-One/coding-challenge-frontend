import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCallLogs } from "../../api";
import leftArrow from "../../assets/left-arrow.svg";

const Call = () => {
  const [logs, setLogs] = useState([]);
  let { number } = useParams();

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getCallLogs(number);
      if (logs.length) {
        return setLogs(logs);
      }
    };
    fetchLogs();
  }, [number]);

  return (
    <div className="call">
      <Link to="/">
        <img className="left-arrow" src={leftArrow} alt="cosi" />
      </Link>
      <div className="table-holder">
        <table>
          <thead>
            <tr>
              <th>Agent name</th>
              <th>Call date and time</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.identifier}>
                <th>
                  {log.agent.firstName} {log.agent.lastName}
                </th>
                <th>
                  {log.dateTime.slice(0, 10)} {log.dateTime.slice(11, 19)}
                </th>
                <th>{log.resolution.resolution}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Call;
