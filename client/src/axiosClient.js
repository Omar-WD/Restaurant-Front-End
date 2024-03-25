import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3008/api', withCredentials: true
});

export default axiosClient;