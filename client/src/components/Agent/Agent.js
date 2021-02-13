import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAgentLogs } from "../../api";

const Agent = () => {
  const [logs, setLogs] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getAgentLogs(id);
      console.log(logs)
      if (logs.length) {
        return setLogs(logs);
      }
    };
    fetchLogs();
  }, [id]);

  return (
    <div className="agent">
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
              <th>{log.dateTime}</th>
              <th>{log.resolution.resolution}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Agent;
