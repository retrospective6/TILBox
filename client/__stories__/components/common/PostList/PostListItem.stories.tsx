import React from 'react';
import PostListItem from '@/components/common/PostList/PostListItem';
import { ComponentStory } from '@storybook/react';
import { ADMIN_POST, POST } from '@mocks/MockData';

export default {
  component: PostListItem,
  title: 'common/PostList/PostListItem',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof PostListItem> = (args) => (
  <PostListItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  post: POST,
};

export const Admin = Template.bind({});
Admin.args = {
  post: ADMIN_POST,
};
