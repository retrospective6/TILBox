import cookie from '@/utils/cookie';

const KEY = 'accessToken';

const auth = {
  set(value: string): void {
    cookie.set(KEY, value);
  },
  get(): string | undefined {
    return cookie.get(KEY);
  },
  isLoggedIn(): boolean {
    return !!auth.get();
  },
  logout(): void {
    cookie.remove(KEY);
  },
};

export default auth;
