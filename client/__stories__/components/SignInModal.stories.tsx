import React from 'react';
import SignInModal from '@/components/SignInModal';
import { ComponentStory } from '@storybook/react';

export default {
  component: SignInModal,
  title: 'LoginModal',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof SignInModal> = (args) => (
  <SignInModal {...args} />
);

export const Default = Template.bind({});
