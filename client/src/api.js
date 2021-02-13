import axios from "axios";

export const getAccumulatedLogs = async () => {
  try {
    const { data } = await axios.get("http://localhost:3500/accumulated-logs");
    return data;
  } catch (error) {
    return error;
  }
};

export const getAgentLogs = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:3500/agent/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getCallLogs = async (number) => {
  console.log("====", number);
  try {
    const { data } = await axios.get(`http://localhost:3500/calls/${number}`);
    return data;
  } catch (error) {
    return error;
  }
};
