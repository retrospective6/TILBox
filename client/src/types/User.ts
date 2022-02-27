export default interface User {
  email: string;
  myTilAddress: string;
  profile: Profile;
  role: UserRole;
  emailNotificationTime?: string;
}

export interface Profile {
  nickname: string;
  image: string;
  description?: string;
  subscribeCount?: number;
}

export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';
