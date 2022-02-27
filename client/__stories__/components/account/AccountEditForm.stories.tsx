import React from 'react';
import AccountEditForm from '@/components/account/AccountEditForm';
import { ComponentStory } from '@storybook/react';
import { USER } from '@mocks/data/users';

export default {
  component: AccountEditForm,
  title: 'account/AccountEditForm',
};

const Template: ComponentStory<typeof AccountEditForm> = (args) => (
  <AccountEditForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: {
    ...USER,
    emailNotificationTime: '14:30',
  },
};
