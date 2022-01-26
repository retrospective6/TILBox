import React from 'react';
import Layout from '@/components/common/Layout';
import { ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';

export default {
  component: Layout,
  title: 'common/Layout',
};

const Template: ComponentStory<typeof Layout> = (args) => (
  <Layout>{args.children}</Layout>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Layout',
};

export const WithoutUser = Template.bind({});
WithoutUser.args = {
  children: 'Layout',
};
WithoutUser.parameters = {
  msw: [
    rest.get(mockApiURL('/users/profile'), (req, res, ctx) =>
      res(ctx.status(403)),
    ),
  ],
};
