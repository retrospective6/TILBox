export default interface User {
  nickname: string;
  image: string;
  role: UserRole;
}

export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';
