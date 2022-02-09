import {
  UseMutateAsyncFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
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
  const mutation = useMutation(deleteUser, options);

  return {
    deleteUser: mutation.mutateAsync,
    ...mutation,
  };
}
