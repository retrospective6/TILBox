import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:8080/v1/',
  timeout: 30000,
  headers: {
    'content-type': 'application/json',
  },
});
