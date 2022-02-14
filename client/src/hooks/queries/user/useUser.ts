import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import User from '@/types/User';
import auth from '@/utils/auth';
import apis from '@/apis';

export type UseUserResult = UseQueryResult<User, AxiosError> & {
  user?: User;
  loggedOut: boolean;
};

export default function useUser(
  options?: UseQueryOptions<User, AxiosError>,
): UseUserResult {
  const result = useQuery<User, AxiosError>('users', apis.users.get, {
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
