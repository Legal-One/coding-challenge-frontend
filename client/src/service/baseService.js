import { axiosInstance } from "."

export const getDashboardData=async ()=>{
    let response=await axiosInstance.get('/')
    return response;
}

export const getAgentData=async (id)=>{
    let response=await axiosInstance.get(`/agent/${id}`)
    return response;
}
export const getCallData=async (num)=>{
    let response=await axiosInstance.get(`/call/${num}`)
    return response;
}