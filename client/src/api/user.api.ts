import { http } from '@/api/http';

interface SignupRequest {
  myTilAddress: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  emailCheck: boolean;
}

export const signup = (param: SignupRequest) => {
  return http.post('/signup', param);
};
