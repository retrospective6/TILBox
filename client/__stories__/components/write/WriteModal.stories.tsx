import React from 'react';
import WriteModal from '@/components/write/Modal/WriteModal';
import { ComponentStory } from '@storybook/react';

export default {
  component: WriteModal,
  title: 'write/WriteModal',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof WriteModal> = (args) => (
  <WriteModal {...args} />
);

export const Default = Template.bind({});
Default.args = {};
