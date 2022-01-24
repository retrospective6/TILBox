import React from 'react';
import Header from '@/components/common/Header/Header';
import { ComponentStory } from '@storybook/react';
import { USER, USER_LONG_NICKNAME } from '@mocks/data/users';

export default {
  component: Header,
  title: 'common/Header/Header',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Main = Template.bind({});
Main.args = {
  active: '/',
};

export const Timeline = Template.bind({});
Timeline.args = {
  active: '/timeline',
};

export const MyBOX = Template.bind({});
MyBOX.args = {
  active: '/mybox',
};

export const WithUser = Template.bind({});
WithUser.args = {
  ...Main.args,
  user: USER,
};

export const 닉네임_긴_경우 = Template.bind({});
닉네임_긴_경우.args = {
  ...Main.args,
  user: USER_LONG_NICKNAME,
};
