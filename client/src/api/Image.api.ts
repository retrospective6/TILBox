import { http } from '@/api/http';
import { AxiosResponse } from 'axios';

interface ImageResponse {
  url: string;
}

export const upload = (file: File): Promise<AxiosResponse<ImageResponse>> => {
  return http.post('images/upload', file);
};
