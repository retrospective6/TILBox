import React from 'react';
import Layout from '@/components/common/Layout';
import { ComponentStory } from '@storybook/react';

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
Default.parameters = {
  cookie: {
    accessToken: 'test',
  },
};

export const WithoutUser = Template.bind({});
WithoutUser.args = {
  children: 'Layout',
};
