import React from 'react';
import SlideMenu from '@/components/common/SlideMenu';
import { ComponentStory } from '@storybook/react';
import { PROFILE } from '@mocks/data/users';

export default {
  component: SlideMenu,
  title: 'common/SlideMenu',
};

const Template: ComponentStory<typeof SlideMenu> = (args) => (
  <SlideMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  profile: PROFILE,
};
