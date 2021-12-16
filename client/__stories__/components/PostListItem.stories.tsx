import React from 'react';
import PostListItem from '@/components/PostList/PostListItem';
import { ComponentStory } from '@storybook/react';

export default {
  component: PostListItem,
  title: 'PostList/PostListItem',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof PostListItem> = (args) => (
  <PostListItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  post: {
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
  },
};

export const Admin = Template.bind({});
Admin.args = {
  post: {
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
  },
};
