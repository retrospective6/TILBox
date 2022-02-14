import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import User from '@/types/User';
import auth from '@/utils/auth';

export interface UseUserResponse {
  loggedOut: boolean;
  user?: User;
}

export default function useUser(): UseUserResponse {
  const isLoggedIn = auth.isLoggedIn();
  const { data, error } = useSWR<User>(isLoggedIn ? '/users' : null, fetcher, {
    errorRetryCount: 0,
  });

  const loggedOut = !isLoggedIn || (error && error.status === 403);

  return {
    loggedOut,
    user: data,
  };
}
