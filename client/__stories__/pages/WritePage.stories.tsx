import React from 'react';
import { ComponentStory } from '@storybook/react';
import WritePage from '@/pages/write';
import { PageContainer } from '../utils/Components';

export default {
  component: WritePage,
  title: 'page/WritePage',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof WritePage> = () => (
  <PageContainer>
    <WritePage />
  </PageContainer>
);

export const Default = Template;
