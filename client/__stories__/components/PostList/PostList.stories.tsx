import React from 'react';
import PostList from '@/components/PostList/PostList';
import { ComponentStory } from '@storybook/react';
import { POSTS } from '@mocks/MockData';

export default {
  component: PostList,
  title: 'PostList/PostList',
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
  zigzag: true,
};
