import { tilAxios } from '@/apis/utils';

export interface LoginRequest {
  email: string;
  password: string;
}

export function login(param: LoginRequest): Promise<string | undefined> {
  return tilAxios.post('/login', param).then((res) => res.data);
}
