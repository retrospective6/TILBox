import { tilAxios } from '@/apis/utils';
import { Profile } from '@/types/User';
import { getAuthHeader } from '@/apis/utils/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export function login(param: LoginRequest): Promise<LoginResponse> {
  return tilAxios.post('/login', param).then((res) => res.data);
}

export function getProfile(): Promise<Profile> {
  return tilAxios
    .get('/users/profile', getAuthHeader())
    .then((res) => res.data);
}
