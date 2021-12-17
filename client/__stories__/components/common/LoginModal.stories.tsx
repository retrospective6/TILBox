import React from 'react';
import LoginModal from '@/components/common/LoginModal';
import { ComponentStory } from '@storybook/react';

export default {
  component: LoginModal,
  title: 'LoginModal',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof LoginModal> = (args) => (
  <LoginModal {...args} />
);

export const Default = Template.bind({});
