import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1'

const getAggregateData = () => axios.get(`${baseURL}/logs`);
const getAgentData = (agentId) => axios.get(`${baseURL}/agents/${agentId}`);
const getNumberData = (number) => axios.get(`${baseURL}/logs/${number}`);

export {
    getAggregateData,
    getAgentData,
    getNumberData
}
