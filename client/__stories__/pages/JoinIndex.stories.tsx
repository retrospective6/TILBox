import React from 'react';
import SearchInput from '@/components/SearchInput';
import { ComponentStory } from '@storybook/react';
import Index from '@/pages/join/Index';

export default {
  component: Index,
  title: 'JoinIndex',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof SearchInput> = () => <Index />;

export const Default = Template.bind({});
