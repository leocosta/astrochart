import axios from 'axios';

const headers = {
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
};

const api = axios.create({
    headers,
    baseURL: 'http://localhost:3000',
});

export default api;