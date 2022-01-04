import React from 'react';
import { ComponentStory } from '@storybook/react';
import SignUpPage from '@/pages/signUp/signUpPage';

export default {
  component: SignUpPage,
  title: 'page/SignUpPage',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof SignUpPage> = () => <SignUpPage />;

export const Default = Template;
