import React from 'react';
import Layout from '@/components/common/Layout';
import { ComponentStory } from '@storybook/react';

export default {
  component: Layout,
  title: 'common/Layout',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Layout',
};
