import User, { Profile } from '@/types/User';
import { IMG_SRC } from '@mocks/data';

export const PROFILE: Profile = {
  nickname: 'tilbox',
  image: IMG_SRC,
  description: '',
  subscribeCount: 0,
};

export const PROFILE_LONG_NICKNAME: Profile = {
  ...PROFILE,
  nickname: '일이삼사오육칠팔구십일이삼사오육',
};

export const USER: User = {
  email: 'tilbox@tilbox.com',
  myTilAddress: 'tilbox',
  profile: PROFILE,
  role: 'ROLE_USER',
};

export const ADMIN: User = {
  email: 'admin@tilbox.com',
  myTilAddress: 'admin',
  profile: {
    nickname: '운영자',
    image: IMG_SRC,
    description: '',
    subscribeCount: 0,
  },
  role: 'ROLE_ADMIN',
};
