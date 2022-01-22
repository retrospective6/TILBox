import { tilAxios } from '@/apis/utils';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export function login(param: LoginRequest): Promise<LoginResponse> {
  return tilAxios.post('/login', param).then((res) => res.data);
}
