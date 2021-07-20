import React from "react";

function AgentCallLog({ agentCallLogs }) {
    return (
        <table className="">
            <thead>
                <tr>
                    <th>Phone number</th>
                    <th>Call date and time</th>
                    <th>Resolution</th>
                </tr>
            </thead>
            <tbody>
                {agentCallLogs.map((agentCallLog, i) => (
                    <tr key={i}>
                        <td>{agentCallLog.phoneNumber}</td>
                        <td>{getFormattedTime(agentCallLog.callTime)}</td>
                        <td>{agentCallLog.resolution}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default AgentCallLog;

const getFormattedTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};