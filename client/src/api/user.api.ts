import { http } from '@/api/http';
import { AxiosResponse } from 'axios';

interface SignupRequest {
  myTilAddress: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  emailCheck: boolean;
}

interface SignupResponse {
  myTilAddress: string;
  email: string;
  profile: {
    nickname: string;
    image: string;
  };
  registrationType: string;
  userRole: string;
  createdAt: Date;
  updateAt: Date;
  deleteAt: Date | null;
}

export const signup = (
  param: SignupRequest,
): Promise<AxiosResponse<SignupResponse>> => {
  return http.post('/signup', param);
};
