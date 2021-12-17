import Post from '@/types/Post';

export const POST: Post = {
  id: 0,
  title: '여덟글자하이용',
  user: {
    nickname: 'KS-KIM',
    image: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  },
  thumbnail: '#D45438 #FEA768',
  description:
    '요약글 미입력시 본문 앞 내용을 불러와서 여기에 3줄까지 표시됩니다. 이후는 ‘...’ 말 줄임표를 통해 나타납니다.(요약글 동일)',
  likes: 0,
  comments: 0,
  createdAt: '21.12.15',
  tags: ['tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag'],
};

export const ADMIN_POST: Post = {
  id: 1,
  title: '뭔가 공지를 하는 글입니다.',
  user: {
    nickname: '운영자',
    image: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  },
  thumbnail: '#000000 #000000',
  description:
    '요약글 미입력시 본문 앞 내용을 불러와서 여기에 3줄까지 표시됩니다. 이후는 ‘...’ 말 줄임표를 통해 나타납니다.(요약글 동일)',
  likes: 1,
  comments: 10,
  createdAt: '21.12.15',
  tags: ['tag', 'tag'],
};

export const POSTS: Post[] = [
  POST,
  { ...POST, id: 2 },
  { ...POST, id: 3 },
  { ...POST, id: 4 },
  { ...POST, id: 5 },
  { ...POST, id: 6 },
  { ...POST, id: 7 },
  { ...POST, id: 8 },
  { ...POST, id: 9 },
  { ...POST, id: 10 },
  ADMIN_POST,
];
