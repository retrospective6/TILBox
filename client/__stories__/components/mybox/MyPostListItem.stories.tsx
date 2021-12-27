import React from 'react';
import MyPostListItem from '@/components/mybox/MyPostListItem';
import { ComponentStory } from '@storybook/react';
import { POST } from '@mocks/MockData';

export default {
  component: MyPostListItem,
  title: 'mybox/MyPostListItem',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof MyPostListItem> = (args) => (
  <MyPostListItem {...args} />
);

export const Active = Template.bind({});
Active.args = {
  post: POST,
  active: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  post: POST,
  active: false,
};
