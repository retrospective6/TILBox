import * as users from './users';

export function mockApiURL(path: string): string {
  return process.env.API_HOST + path;
}

export const mockApis = [...Object.values(users)];
