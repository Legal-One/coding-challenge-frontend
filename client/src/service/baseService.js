import { axiosInstance } from "."

export const getDashboardData=async ()=>{
    let response=await axiosInstance.get('/')
    return response;
}