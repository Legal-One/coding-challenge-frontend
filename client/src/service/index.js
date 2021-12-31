import Axios from 'axios';
const axiosInstance=Axios.create({
    baseURL:'http://localhost:6001/api'
})
export {axiosInstance}