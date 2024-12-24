import axios from 'axios';

const Client = axios.create({
    baseURL:'http://localhost:3000/api/v1/',
    //http://fall2024c56g6.int3306.freeddns.org/api/v1/
    headers: {
    'content-type': 'application/json',
    },
    });
    Client.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
Client.interceptors.response.use((response) => {
    if (response && (response.data || response.data === 0)) {
    return response.data;
    }
    return response;
    }, (error) => {
    // Handle errors
    throw error;
});
export default Client;