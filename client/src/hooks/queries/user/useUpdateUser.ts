import {
  UseMutateAsyncFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { AxiosError } from 'axios';
import User from '@/types/User';
import apis from '@/apis';
import { UpdateUserRequest } from '@/apis/users';

type UseUpdateUserResult = UseMutationResult<
  User,
  AxiosError,
  UpdateUserRequest
> & {
  updateUser: UseMutateAsyncFunction<User, AxiosError, UpdateUserRequest>;
};

export default function useUpdateUser(
  options?: UseMutationOptions<User, AxiosError, UpdateUserRequest>,
): UseUpdateUserResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, AxiosError, UpdateUserRequest>(
    (data: UpdateUserRequest) => apis.users.update(data),
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
