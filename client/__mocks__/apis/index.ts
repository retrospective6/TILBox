import * as users from './users';
import * as images from './images';

export const mockApis = Object.values({
  users,
  images,
}).flatMap((apis: object) => Object.values(apis));
