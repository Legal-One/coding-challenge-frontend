const baseURL = 'http://localhost:3000';

export const fetchAllCalls = () =>
    fetch(`${baseURL}/calls`)
        .then(response => response.json())
        .then(response => response);
