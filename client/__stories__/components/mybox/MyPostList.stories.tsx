import React from 'react';
import MyPostList from '@/components/mybox/MyPostList';
import { ComponentStory } from '@storybook/react';
import { POSTS } from '@mocks/MockData';

export default {
  component: MyPostList,
  title: 'mybox/MyPostList',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof MyPostList> = (args) => (
  <MyPostList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  posts: POSTS,
  month: 12,
  year: 2021,
};
