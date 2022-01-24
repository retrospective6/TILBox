import User from '@/types/User';
import { IMG_SRC } from '@mocks/data/index';

export const USER: User = {
  nickname: 'KS-KIM',
  image: IMG_SRC,
  role: 'ROLE_USER',
};

export const USER_LONG_NICKNAME: User = {
  ...USER,
  nickname: '일이삼사오육칠팔구십일이삼사오육',
};

export const ADMIN: User = {
  nickname: '운영자',
  image: IMG_SRC,
  role: 'ROLE_ADMIN',
};
