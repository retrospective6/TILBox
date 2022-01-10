import React from 'react';
import { ComponentStory } from '@storybook/react';
import Index from '@/pages/signup';

export default {
  component: Index,
  title: 'page/Index',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof Index> = () => <Index />;

export const Default = Template;
