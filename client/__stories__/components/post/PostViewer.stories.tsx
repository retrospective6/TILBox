import React from 'react';
import PostViewer from '@/components/post/PostViewer';
import { ComponentStory } from '@storybook/react';
import { POST } from '@mocks/data/posts';

export default {
  component: PostViewer,
  title: 'post/PostViewer',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof PostViewer> = (args) => (
  <PostViewer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  post: POST,
};
