import { tilAxios } from '@/apis/utils';

export interface UploadResponse {
  url: string;
}

export function upload(imageFile: FormData): Promise<UploadResponse> {
  return tilAxios
    .post('/images/upload', imageFile, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then((res) => res.data);
}
