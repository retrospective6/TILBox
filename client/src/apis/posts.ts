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
  return client.get<Post>(`/posts/${id}`).then((res) => convertPost(res.data));
}

export interface GetPostListRequest {
  lastPostId?: number;
  size?: number;
}

export function getList(params: GetPostListRequest): Promise<Post[]> {
  return client
    .get<Post[]>(`/posts`, { params })
    .then((res) => res.data.map((post) => convertPost(post)));
}

export function getMyList(params: GetPostListRequest): Promise<Post[]> {
  return client
    .get<Post[]>(`/me/posts`, { params })
    .then((res) => res.data.map((post) => convertPost(post)));
}

function convertPost(post: Post): Post {
  return {
    ...post,
    createdAt: new Date(post.createdAt),
  };
}
