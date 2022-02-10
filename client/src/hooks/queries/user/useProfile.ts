import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import { Profile } from '@/types/User';
import auth from '@/utils/auth';
import apis from '@/apis';

export type UseProfileResult = UseQueryResult<Profile, AxiosError> & {
  profile?: Profile;
  loggedOut: boolean;
};

export default function useProfile(
  options?: UseQueryOptions<Profile, AxiosError>,
): UseProfileResult {
  const result = useQuery<Profile, AxiosError>(
    'profile',
    apis.users.getProfile,
    {
      enabled: auth.isLoggedIn(),
      ...options,
    },
  );

  const loggedOut = !auth.isLoggedIn() || result.isError;

  return {
    profile: result.data,
    loggedOut,
    ...result,
  };
}
