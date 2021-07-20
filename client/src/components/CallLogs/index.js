import React from "react";
import { Link } from "react-router-dom";

function CallLog({ callLogs }) {
    return (
        <table className="">
            <thead>
                <tr>
                    <th>Phone number</th>
                    <th>Number of calls</th>
                    <th>Last call details</th>
                </tr>
            </thead>
            <tbody>
                {callLogs.map((callLog, i) => (
                    <tr key={i}>
                        <td>
                            <Link to={`/call/${callLog.phoneNumber}`}>
                                {callLog.phoneNumber}
                            </Link>
                        </td>
                        <td>{callLog.callCount} {callLog.callCount === 1 ? "call" : "calls"}</td>
                        <td>
                            <Link to={`/agent/${callLog.agentIdentifier}`}>
                                {callLog.agentName}
                            </Link>
                            /{getFormattedTime(callLog.lastCallTime)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default CallLog;

const getFormattedTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
};
