import tilAxios from '@/apis';
import { AxiosResponse } from 'axios';

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
