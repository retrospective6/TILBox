import { http } from '@/api/http';

export const upload = (file: File) => {
  return http.post('images/upload', file);
};
