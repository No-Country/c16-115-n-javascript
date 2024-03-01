import axios from 'axios';

const driveRockApi = axios.create({
    baseURL: "http://localhost:3001"
});

driveRockApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
})

export default driveRockApi;