import Post, { Comment } from '@/types/Post';
import User from '@/types/User';

export const USER: User = {
  nickname: 'KS-KIM',
  image: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  role: 'ROLE_USER',
};

export const ADMIN: User = {
  nickname: '운영자',
  image: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  role: 'ROLE_ADMIN',
};

export const POST_CONTENT = [
  '![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)',
  '',
  '# Awesome Editor!',
  '',
  'It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.',
  '',
  '## Create Instance',
  '',
  'You can create an instance with the following code and use `getHtml()` and `getMarkdown()` of the [Editor](https://github.com/nhn/tui.editor).',
  '',
  '```js',
  'const editor = new Editor(options);',
  '```',
  '',
  '> See the table below for default options',
  '> > More API information can be found in the document',
  '',
  '| name | type | description |',
  '| --- | --- | --- |',
  '| el | `HTMLElement` | container element |',
  '',
  '## Features',
  '',
  '* CommonMark + GFM Specifications',
  '   * Live Preview',
  '   * Scroll Sync',
  '   * Auto Indent',
  '   * Syntax Highlight',
  '        1. Markdown',
  '        2. Preview',
  '',
  '## Support Wrappers',
  '',
  '> * Wrappers',
  '>    1. [x] React',
  '>    2. [x] Vue',
  '>    3. [ ] Ember',
].join('\n');

export const COMMENT: Comment = {
  id: 0,
  user: USER,
  content:
    '이렇게 저렇게 댓글이 남겨지고 일단 좋아요는 없이 댓글 노출만하기 1000자 이하로 나와서 하단으로 증가하는 영역을' +
    '생각하고 잇기 때문에 이렇게 주절거리는게 많아지는 예시...',
  createdAt: new Date('2021.01.12'),
};

export const NestedComment: Comment = {
  id: 2,
  user: USER,
  content: '대대대대대대댓글',
  createdAt: new Date('2021.01.13'),
};
export const NestedComment2: Comment = {
  id: 2,
  user: USER,
  content:
    '저도 잘이렇게 저렇게 댓글이 남겨지고 일단 좋아요는 없이 댓글 노출만하기 1000자 이하로 나와서 하단으로\n' +
    '\n' +
    '\n' +
    '\n' +
    '증가하는 영역을 생각하고 잇고 대덧글을 이렇게!',
  createdAt: new Date('2021.01.13'),
};

export const COMMENT2: Comment = {
  id: 1,
  user: USER,
  content:
    '저도 잘이렇게 저렇게 댓글이 남겨지고 일단 좋아요는 없이 댓글 노출만하기 1000자 이하로 나와서 하단으로\n' +
    '증가하는 영역을 생각하고 잇고 대덧글을 이렇게!\n' +
    '근데 답글이라고 말할지, 대댓글ㅇ로 말할지 이것도 논의해봐야할 것 같당\n' +
    '그리고 엔터만 무수하게 쳐서 1000자를 채울 경우도 잇나? 그건 막아야지겠지?\n' +
    '뇽\n' +
    '뇽용\n' +
    '용ㅇ 이런\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '그리고 이렇게?',
  comments: [NestedComment, NestedComment2],
  createdAt: new Date('2021.01.12'),
};

export const POST: Post = {
  id: 0,
  user: USER,
  title: '여덟글자하이용',
  content: POST_CONTENT,
  thumbnail: {
    gradient: { start: '#D45438', end: '#FEA768' },
  },
  summary:
    '요약글 미입력시 본문 앞 내용을 불러와서 여기에 3줄까지 표시됩니다. 이후는 ‘...’ 말 줄임표를 통해 나타납니다.(요약글 동일)',
  likes: 0,
  comments: [COMMENT, COMMENT2],
  createdAt: new Date('2021.12.15'),
  tags: ['tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag'],
  visibleLevel: 'public',
};

export const ADMIN_POST: Post = {
  id: 1,
  user: ADMIN,
  title: '뭔가 공지를 하는 글입니다.',
  content: POST_CONTENT,
  thumbnail: {
    gradient: { start: '#000000', end: '#000000' },
  },
  summary:
    '요약글 미입력시 본문 앞 내용을 불러와서 여기에 3줄까지 표시됩니다. 이후는 ‘...’ 말 줄임표를 통해 나타납니다.(요약글 동일)',
  likes: 1,
  comments: [COMMENT, COMMENT2],
  createdAt: new Date('2021.12.15'),
  tags: ['tag', 'tag'],
  visibleLevel: 'public',
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
