const baseURL = 'http://localhost:3000';

export const fetchAllCallHistory = () =>
    fetch(`${baseURL}/calls`)
        .then(response => response.json())
        .then(response => response);

export const fetchAgentHistory = agentId =>
    fetch(`${baseURL}/agent/${agentId}`)
        .then(response => response.json())
        .then(response => response);

export const fetchCallHistory = number =>
    fetch(`${baseURL}/call/${number}`)
        .then(response => response.json())
        .then(response => response);
