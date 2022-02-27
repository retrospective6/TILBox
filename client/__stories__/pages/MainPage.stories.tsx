import React from 'react';
import { ComponentStory } from '@storybook/react';
import MainPage from '@/pages';
import { PageContainer } from '../utils/Components';

export default {
  component: MainPage,
  title: 'page/MainPage',
};

const Template: ComponentStory<typeof MainPage> = () => (
  <PageContainer>
    <MainPage />
  </PageContainer>
);

export const Default = Template.bind({});
Default.parameters = {
  cookie: {
    accessToken: 'test',
  },
};

export const WithoutUser = Template.bind({});
