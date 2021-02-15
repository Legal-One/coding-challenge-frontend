import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAgentLogs } from "../../api";
import leftArrow from "../../assets/left-arrow.svg";

const Agent = () => {
  const [logs, setLogs] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getAgentLogs(id);
      if (logs.length) {
        return setLogs(logs);
      }
    };
    fetchLogs();
  }, [id]);

  return (
    <div className="agent">
      <Link to="/">
        <img className="left-arrow" src={leftArrow} alt="cosi" />
      </Link>
      <div className="table-holder">
        <table>
          <thead>
            <tr>
              <th>Phone number</th>
              <th>Call date and time</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.identifier}>
                <th>{log.number}</th>
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

export default Agent;
