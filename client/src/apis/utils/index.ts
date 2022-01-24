import axios, { AxiosInstance } from 'axios';

export const tilAxios: AxiosInstance = axios.create({
  baseURL: process.env.API_HOST,
});
