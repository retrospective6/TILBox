import React from 'react';
import TagInput from '@/components/write/Modal/TagInput';
import { ComponentStory } from '@storybook/react';

export default {
  component: TagInput,
  title: 'write/TagInput',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof TagInput> = (args) => (
  <TagInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
