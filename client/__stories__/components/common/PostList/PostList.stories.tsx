import React from 'react';
import PostList from '@/components/common/PostList/PostList';
import { ComponentStory } from '@storybook/react';

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

export const ZigZag = Template.bind({});
ZigZag.args = {
  type: 'zigzag',
};
