import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;

if (__DEV__) {
  api = axios.create({
    baseURL: process.env.API_DEV_URL,
  });
} else {
  api = axios.create({
    baseURL: 'https://api.unocollect.com.br',
  });
}

export default api;
