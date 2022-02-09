import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import client from '@/utils/api';
import { AxiosError } from 'axios';
import User from '@/types/User';
import auth from '@/utils/auth';

export type UseUserResult = UseQueryResult<User, AxiosError> & {
  user?: User;
  loggedOut: boolean;
};

export async function getUser(): Promise<User> {
  return client.get<User>('users').then((res) => res.data);
}

export default function useUser(
  options?: UseQueryOptions<User, AxiosError>,
): UseUserResult {
  const result = useQuery<User, AxiosError>('users', getUser, {
    enabled: auth.isLoggedIn(),
    ...options,
  });

  const loggedOut = !auth.isLoggedIn() || result.isError;

  return {
    user: result.data,
    loggedOut,
    ...result,
  };
}
