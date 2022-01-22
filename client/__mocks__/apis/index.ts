import * as users from './users';
import * as images from './images';
import * as posts from './posts';

export const mockApis = Object.values({
  users,
  images,
  posts,
}).flatMap((apis: object) => Object.values(apis));
