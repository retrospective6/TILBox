import client from '@/apis/utils/client';

export interface UploadResponse {
  url: string;
}

export function upload(image: string): Promise<UploadResponse> {
  const imageFile = new FormData();
  imageFile.append('imageFile', image);

  return client
    .post('/images/upload', imageFile, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then((res) => res.data);
}
