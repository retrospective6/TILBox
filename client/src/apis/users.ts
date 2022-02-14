import client from '@/apis/utils/client';
import User, { Profile } from '@/types/User';

export interface LoginRequest {
  email: User['email'];
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return client.post('/login', data).then((res) => res.data);
}

export async function signOut(): Promise<void> {
  return client.delete('/users').then((res) => res.data);
}

export interface UpdateUserRequest {
  image: User['profile']['image'];
  nickname: User['profile']['nickname'];
  password: string;
  notification?: User['notification'];
}

export async function update(data: UpdateUserRequest): Promise<User> {
  return client.put('/users', data).then((res) => res.data);
}

export async function getProfile(): Promise<Profile> {
  return client.get<Profile>('/users/profile').then((res) => res.data);
}

export async function get(): Promise<User> {
  return client.get<User>('/users').then((res) => res.data);
}
