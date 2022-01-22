import * as users from './users';
import * as images from './images';
import * as posts from './posts';

export const mockApis = Object.values({
  users,
  images,
  posts,
}).flatMap((apis: Record<string, unknown>) => Object.values(apis));
