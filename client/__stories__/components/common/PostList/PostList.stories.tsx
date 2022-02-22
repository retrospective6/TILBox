import React from 'react';
import PostList from '@/components/common/PostList/PostList';
import { ComponentStory } from '@storybook/react';
import { POSTS } from '@mocks/data/posts';

export default {
  component: PostList,
  title: 'common/PostList/PostList',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof PostList> = (args) => (
  <PostList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  posts: POSTS,
};

export const ZigZag = Template.bind({});
ZigZag.args = {
  posts: POSTS,
  type: 'zigzag',
};
