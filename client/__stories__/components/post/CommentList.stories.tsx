import React from 'react';
import CommentList from '@/components/post/CommentList/CommentList';
import { ComponentStory } from '@storybook/react';
import { COMMENT, COMMENT2 } from '@mocks/data/comments';
import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';

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

export const WithoutLogin = Template.bind({});
WithoutLogin.args = {
  comments: [COMMENT, COMMENT2],
};
WithoutLogin.parameters = {
  msw: [
    rest.get(mockApiURL('/users/profile'), (req, res, ctx) =>
      res(ctx.status(403)),
    ),
  ],
};
