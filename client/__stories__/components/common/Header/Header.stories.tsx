import React from 'react';
import Header from '@/components/common/Header/Header';
import { ComponentStory } from '@storybook/react';

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
  user: {
    nickname: 'test',
    image: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  },
};

export const 닉네임_긴_경우 = Template.bind({});
닉네임_긴_경우.args = {
  ...Main.args,
  user: {
    nickname: '일이삼사오육칠팔구십일이삼사오육',
    image: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  },
};
