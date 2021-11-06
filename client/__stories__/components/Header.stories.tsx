import React from 'react';
import Header from '@/components/Header';
import { ComponentStory } from '@storybook/react';

export default {
  component: Header,
  title: 'Header',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
