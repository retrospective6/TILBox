import React from 'react';
import SearchInput from '@/components/SearchInput';
import { ComponentStory } from '@storybook/react';
import SignUpPage from '@/pages/signUp/signUpPage';

export default {
  component: SignUpPage,
  title: 'page/SignUpPage',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof SearchInput> = () => <SignUpPage />;

export const Default = Template;
