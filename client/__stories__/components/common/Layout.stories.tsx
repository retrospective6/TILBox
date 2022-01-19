import React from 'react';
import Layout from '@/components/common/Layout';
import { ComponentStory } from '@storybook/react';
import { mockApis } from '@mocks/apis';

export default {
  component: Layout,
  title: 'common/Layout',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    msw: mockApis,
  },
};

const Template: ComponentStory<typeof Layout> = (args) => (
  <Layout>{args.children}</Layout>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Layout',
};
