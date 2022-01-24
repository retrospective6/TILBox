import axios, { AxiosInstance } from 'axios';
import cookie from '@/utils/cookie';

export const http: AxiosInstance = axios.create({
  baseURL: process.env.API_HOST,
});

export const getAuthHeader = (): { headers: { Authorization: string } } => ({
  headers: {
    Authorization: `Bearer ${cookie.getAuth()}`,
  },
});

export default function fetcher<T>(url: string): Promise<T> {
  return http.get<T>(url, getAuthHeader()).then((res) => res.data);
}
