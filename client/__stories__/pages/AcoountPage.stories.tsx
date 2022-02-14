import React from 'react';
import { ComponentStory } from '@storybook/react';
import AccountPage from '@/pages/account';
import { PageContainer } from '../utils/Components';

export default {
  component: AccountPage,
  title: 'page/AccountPage',
};

const Template: ComponentStory<typeof AccountPage> = () => (
  <PageContainer>
    <AccountPage />
  </PageContainer>
);

export const Default = Template.bind({});
Default.parameters = {
  cookie: {
    accessToken: 'test',
  },
};

export const WithoutUser = Template.bind({});
