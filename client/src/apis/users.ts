import { AxiosResponse } from 'axios';
import { tilAxios } from '@/apis/utils';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string | undefined;
}

export function login(
  param: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> {
  return tilAxios.post('/login', param);
}
