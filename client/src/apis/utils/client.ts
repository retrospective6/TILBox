import axios, { AxiosInstance } from 'axios';
import auth from '@/utils/auth';

const client: AxiosInstance = axios.create({
  baseURL: process.env.API_HOST,
});

client.interceptors.request.use(
  (config) => {
    if (!auth.isLoggedIn()) {
      return config;
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${auth.get()}`,
    };

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default client;
