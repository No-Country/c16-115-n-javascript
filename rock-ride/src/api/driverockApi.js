import axios from 'axios';

const driveRockApi = axios.create({
    baseURL: "https://rock-ride-server-five.vercel.app"
});

driveRockApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})

export default driveRockApi;