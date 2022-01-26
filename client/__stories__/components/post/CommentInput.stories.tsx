import React from 'react';
import CommentInput from '@/components/post/CommentList/CommentInput';
import { ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';

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

export const WithoutUser = Template.bind({});
WithoutUser.parameters = {
  msw: [
    rest.get(mockApiURL('/users/profile'), (req, res, ctx) =>
      res(ctx.status(403)),
    ),
  ],
};
