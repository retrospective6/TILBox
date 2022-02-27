import cookie from '@/utils/cookie';

const auth = {
  set(value: string): void {
    cookie.set('accessToken', value);
  },
  get(): string | undefined {
    return cookie.get('accessToken');
  },
  isLoggedIn(): boolean {
    return !!auth.get();
  },
};

export default auth;
