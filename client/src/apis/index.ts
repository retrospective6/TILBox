import axios, { AxiosInstance } from 'axios';

const tilAxios: AxiosInstance = axios.create({
  baseURL: process.env.API_HOST,
});

export default tilAxios;
