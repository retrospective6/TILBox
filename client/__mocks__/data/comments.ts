import { Comment } from '@/types/Post';
import { USER } from '@mocks/data/users';

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
  id: 3,
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
