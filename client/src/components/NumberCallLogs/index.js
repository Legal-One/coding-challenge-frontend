import React from "react";

function NumberCallLogs({ phoneNumberCallLogs }) {
    return (
        <table className="">
            <thead>
                <tr>
                    <th>Agent Name</th>
                    <th>Call date and time</th>
                    <th>Resolution</th>
                </tr>
            </thead>
            <tbody>
                {phoneNumberCallLogs.map((phoneNumberCallLog, i) => (
                    <tr key={i}>
                        <td>{phoneNumberCallLog.agentName}</td>
                        <td>{getFormattedTime(phoneNumberCallLog.callTime)}</td>
                        <td>{phoneNumberCallLog.resolution}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default NumberCallLogs;

const getFormattedTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};