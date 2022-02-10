import {
  UseMutateAsyncFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
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

export default function useUpdateUser(
  options?: UseMutationOptions<User, AxiosError, UpdateUserRequest>,
): UseUpdateUserResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, AxiosError, UpdateUserRequest>(
    (data: UpdateUserRequest) => updateUser(data),
    {
      ...options,
      onSuccess(data, variables, context) {
        queryClient.setQueryData('users', data);
        if (options?.onSuccess) {
          options?.onSuccess(data, variables, context);
        }
      },
    },
  );

  return {
    updateUser: mutation.mutateAsync,
    ...mutation,
  };
}
