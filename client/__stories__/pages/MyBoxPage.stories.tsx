import React from 'react';
import { ComponentStory } from '@storybook/react';
import MyBoxPage from '@/pages/mybox';
import { PageContainer } from '../utils/Components';

export default {
  component: MyBoxPage,
  title: 'page/MyBoxPage',
};

const Template: ComponentStory<typeof MyBoxPage> = () => (
  <PageContainer>
    <MyBoxPage />
  </PageContainer>
);

export const Default = Template.bind({});
Default.parameters = {
  cookie: {
    accessToken: 'test',
  },
};
