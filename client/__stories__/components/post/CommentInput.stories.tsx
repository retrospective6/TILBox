import React from 'react';
import CommentList from '@/components/post/CommentList/CommentList';
import { ComponentStory } from '@storybook/react';
import { COMMENT, COMMENT2 } from '@mocks/data/comments';

export default {
  component: CommentList,
  title: 'post/CommentList',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  comments: [COMMENT, COMMENT2],
};
