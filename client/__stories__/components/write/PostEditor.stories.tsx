import React from 'react';
import PostEditor from '@/components/write/Editor/PostEditor';
import { ComponentStory } from '@storybook/react';
import { PageContainer } from '../../utils/Components';

export default {
  component: PostEditor,
  title: 'write/PostEditor',
};

const Template: ComponentStory<typeof PostEditor> = (args) => (
  <PageContainer>
    <PostEditor {...args} />
  </PageContainer>
);

export const Default = Template.bind({});
Default.args = {};
