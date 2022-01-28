import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { Profile } from '@/types/User';
import auth from '@/utils/auth';

export default function useProfile(): {
  loading: boolean;
  loggedOut: boolean;
  profile?: Profile;
} {
  const isLoggedIn = auth.isLoggedIn();
  const { data, error } = useSWR<Profile>(
    isLoggedIn ? '/users/profile' : null,
    fetcher,
    {
      errorRetryCount: 0,
    },
  );

  const loading = isLoggedIn && !data && !error;
  const loggedOut = !isLoggedIn || (error && error.status === 403);

  return {
    loading,
    loggedOut,
    profile: data,
  };
}
