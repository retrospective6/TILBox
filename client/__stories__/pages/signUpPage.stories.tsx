import React from 'react';
import { ComponentStory } from '@storybook/react';
import SignupPage from '@/pages/signup';

export default {
  component: SignupPage,
  title: 'page/SignupPage',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof SignupPage> = () => <SignupPage />;

export const Default = Template;
