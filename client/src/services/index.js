
export const getCallLogs = () => fetch("http://localhost:4000/call-logs")
    .then((response) => response.json())

export const getAgentCallLogs = (id) => fetch(`http://localhost:4000/agent-logs/${id}`)
    .then((response) => response.json())

export const getPhoneNoCallLogs = (id) => fetch(`http://localhost:4000/phone-no-logs/${id}`)
    .then((response) => response.json())