import {
  UseMutateAsyncFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import client from '@/utils/api';
import { AxiosError } from 'axios';
import User from '@/types/User';

export interface UpdateUserRequest {
  image: User['profile']['image'];
  nickname: User['profile']['nickname'];
  password: string;
  notification?: User['notification'];
}

type UseUpdateUserResult = UseMutationResult<
  User,
  AxiosError,
  UpdateUserRequest
> & {
  updateUser: UseMutateAsyncFunction<User, AxiosError, UpdateUserRequest>;
};

export async function updateUser(data: UpdateUserRequest): Promise<User> {
  return client.put('/users', data).then((res) => res.data);
}

export default function useUserUpdate(
  options?: UseMutationOptions<User, AxiosError, UpdateUserRequest>,
): UseUpdateUserResult {
  const mutation = useMutation<User, AxiosError, UpdateUserRequest>(
    (data: UpdateUserRequest) => updateUser(data),
    options,
  );

  return {
    updateUser: mutation.mutateAsync,
    ...mutation,
  };
}
