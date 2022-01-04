import React from 'react';
import { ComponentStory } from '@storybook/react';
import WritePage from '@/pages/write';

export default {
  component: WritePage,
  title: 'page/WritePage',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof WritePage> = () => <WritePage />;

export const Default = Template;
