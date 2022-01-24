import cookie from '@/utils/cookie';

export const getAuthHeader = (): { headers: { Authorization: string } } => ({
  headers: {
    Authorization: `Bearer ${cookie.getAuth()}`,
  },
});
