import client from '@/apis/utils/client';

export interface UploadResponse {
  url: string;
}

export function upload(imageFile: FormData): Promise<UploadResponse> {
  return client
    .post('/images/upload', imageFile, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then((res) => res.data);
}
