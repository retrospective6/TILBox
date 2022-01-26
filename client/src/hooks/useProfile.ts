import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { Profile } from '@/types/User';

export default function useProfile(): {
  loading: boolean;
  loggedOut: boolean;
  profile?: Profile;
} {
  const { data, error } = useSWR<Profile>('/users/profile', fetcher, {
    errorRetryCount: 0,
  });

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    profile: data,
  };
}
