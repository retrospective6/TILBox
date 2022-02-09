import {
  UseMutateAsyncFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import client from '@/utils/api';
import { AxiosError } from 'axios';
import User from '@/types/User';

export interface LoginRequest {
  email: User['email'];
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

type UseLoginResult = UseMutationResult<
  LoginResponse,
  AxiosError,
  LoginRequest
> & {
  login: UseMutateAsyncFunction<LoginResponse, AxiosError, LoginRequest>;
};

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return client.post('/login', data).then((res) => res.data);
}

export default function useLogin(
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginRequest>,
): UseLoginResult {
  const mutation = useMutation<LoginResponse, AxiosError, LoginRequest>(
    (data: LoginRequest) => login(data),
    options,
  );

  return {
    login: mutation.mutateAsync,
    ...mutation,
  };
}
