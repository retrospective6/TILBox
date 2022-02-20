import client from '@/apis/utils/client';
import Post from '@/types/Post';

export type CreatePostRequest = Omit<
  Post,
  'id' | 'user' | 'likes' | 'comments' | 'createdAt'
>;

export function write(param: CreatePostRequest): Promise<number> {
  return client.post('/posts', param).then((res) => res.data);
}

export function get(id: number): Promise<Post> {
  return client.get(`/posts/${id}`).then((res) => res.data);
}

export interface GetPostListRequest {
  lastPostId?: number;
  size?: number;
}

export function getList(params: GetPostListRequest): Promise<Post[]> {
  return client.get(`/posts`, { params }).then((res) => res.data);
}
