import {
  UseMutateAsyncFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { AxiosError } from 'axios';
import auth from '@/utils/auth';
import { LoginRequest, LoginResponse } from '@/apis/users';
import apis from '@/apis';

type UseLoginResult = UseMutationResult<
  LoginResponse,
  AxiosError,
  LoginRequest
> & {
  login: UseMutateAsyncFunction<LoginResponse, AxiosError, LoginRequest>;
};

export default function useLogin(
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginRequest>,
): UseLoginResult {
  const mutation = useMutation<LoginResponse, AxiosError, LoginRequest>(
    (data: LoginRequest) => apis.users.login(data),
    {
      ...options,
      onSuccess(data, variables, context) {
        auth.set(data.accessToken);
        if (options?.onSuccess) {
          options?.onSuccess(data, variables, context);
        }
      },
    },
  );

  return {
    login: mutation.mutateAsync,
    ...mutation,
  };
}
