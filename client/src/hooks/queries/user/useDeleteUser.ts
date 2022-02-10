import {
  UseMutateAsyncFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import client from '@/utils/api';
import { AxiosError } from 'axios';

type UseDeleteUserResult = UseMutationResult<void, AxiosError, void> & {
  deleteUser: UseMutateAsyncFunction<void, AxiosError>;
};

export async function deleteUser(): Promise<void> {
  return client.delete('/users').then((res) => res.data);
}

export default function useDeleteUser(
  options?: UseMutationOptions<void, AxiosError>,
): UseDeleteUserResult {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteUser, {
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries('users');
      if (options?.onSuccess) {
        options?.onSuccess(data, variables, context);
      }
    },
  });

  return {
    deleteUser: mutation.mutateAsync,
    ...mutation,
  };
}
