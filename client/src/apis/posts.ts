import { tilAxios } from '@/apis/utils';
import { getAuthHeader } from '@/apis/utils/auth';
import Post from '@/types/Post';

export type CreatePostRequest = Omit<
  Post,
  'id' | 'user' | 'likes' | 'comments' | 'createdAt'
>;

export function write(param: CreatePostRequest): Promise<number> {
  return tilAxios
    .post('/posts', param, getAuthHeader())
    .then((res) => res.data);
}

export function get(id: number): Promise<Post> {
  return tilAxios.get(`/posts/${id}`).then((res) => res.data);
}
