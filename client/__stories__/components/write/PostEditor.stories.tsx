import React from 'react';
import PostEditor from '@/components/write/PostEditor';
import { ComponentStory } from '@storybook/react';

export default {
  component: PostEditor,
  title: 'write/PostEditor',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof PostEditor> = (args) => (
  <PostEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {};
