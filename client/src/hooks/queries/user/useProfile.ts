import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import client from '@/utils/api';
import { AxiosError } from 'axios';
import { Profile } from '@/types/User';
import auth from '@/utils/auth';

export type UseProfileResult = UseQueryResult<Profile, AxiosError> & {
  profile?: Profile;
  loggedOut: boolean;
};

export async function getProfile(): Promise<Profile> {
  return client.get<Profile>('/users/profile').then((res) => res.data);
}

export default function useProfile(
  options?: UseQueryOptions<Profile, AxiosError>,
): UseProfileResult {
  const result = useQuery<Profile, AxiosError>('profile', getProfile, {
    enabled: auth.isLoggedIn(),
    ...options,
  });

  const loggedOut = !auth.isLoggedIn() || result.isError;

  return {
    profile: result.data,
    loggedOut,
    ...result,
  };
}
