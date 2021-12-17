import React from 'react';
import Header from '@/components/common/Header';
import { ComponentStory } from '@storybook/react';

export default {
  component: Header,
  title: 'Header',
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
  user: {
    nickname: 'test',
    image: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  },
};
