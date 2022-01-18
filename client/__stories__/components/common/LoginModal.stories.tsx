import React from 'react';
import LoginModal from '@/components/common/Modal/LoginModal';
import { ComponentStory } from '@storybook/react';

export default {
  component: LoginModal,
  title: 'common/Modal/LoginModal',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof LoginModal> = (args) => (
  <LoginModal {...args} />
);

export const Default = Template.bind({});
