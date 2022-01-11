import React from 'react';
import CommentInput from '@/components/post/CommentList/CommentInput';
import { ComponentStory } from '@storybook/react';
import { USER } from '@mocks/MockData';

export default {
  component: CommentInput,
  title: 'post/CommentInput',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof CommentInput> = (args) => (
  <CommentInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: USER,
};
