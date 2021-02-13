import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCallLogs } from "../../api";

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
              <th>{log.dateTime}</th>
              <th>{log.resolution.resolution}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Call;
