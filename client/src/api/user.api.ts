import axios from 'axios';

interface SignupRequest {
  myTilAddress: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  emailCheck: boolean;
}

const http = axios.create({
  baseURL: 'http://localhost:8080/v1/',
  timeout: 1000,
});

export const signup = (param: SignupRequest) => {
  return http.post('/signup', param);
};
