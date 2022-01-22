import React from 'react';
import { ComponentStory } from '@storybook/react';
import WritePage from '@/pages/write';
import { PageContainer } from '../utils/Components';
import { mockApis } from '@mocks/apis';

export default {
  component: WritePage,
  title: 'page/WritePage',
};

const Template: ComponentStory<typeof WritePage> = () => (
  <PageContainer>
    <WritePage />
  </PageContainer>
);

export const Default = Template;
