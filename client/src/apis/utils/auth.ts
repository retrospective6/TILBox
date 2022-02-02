import auth from '@/utils/auth';

export const getAuthHeader = (): { headers: { Authorization: string } } => ({
  headers: {
    Authorization: `Bearer ${auth.get()}`,
  },
});
