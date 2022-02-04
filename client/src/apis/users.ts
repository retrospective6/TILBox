import { tilAxios } from '@/apis/utils';
import User, { Notification, Profile } from '@/types/User';
import { getAuthHeader } from '@/apis/utils/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface UpdateUserRequest {
  image: string;
  nickname: string;
  password: string;
  notification?: Notification;
}

export function login(param: LoginRequest): Promise<LoginResponse> {
  return tilAxios.post('/login', param).then((res) => res.data);
}

export function getProfile(): Promise<Profile> {
  return tilAxios
    .get('/users/profile', getAuthHeader())
    .then((res) => res.data);
}

export function updateUser(data: UpdateUserRequest): Promise<User> {
  return tilAxios.put('/users', data, getAuthHeader()).then((res) => res.data);
}

export function deleteUser(): Promise<void> {
  return tilAxios.delete('/users', getAuthHeader());
}
