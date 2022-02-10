import {
  UseMutateAsyncFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { AxiosError } from 'axios';
import apis from '@/apis';

type UseDeleteUserResult = UseMutationResult<void, AxiosError, void> & {
  deleteUser: UseMutateAsyncFunction<void, AxiosError>;
};

export default function useDeleteUser(
  options?: UseMutationOptions<void, AxiosError>,
): UseDeleteUserResult {
  const queryClient = useQueryClient();
  const mutation = useMutation(apis.users.signOut, {
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
