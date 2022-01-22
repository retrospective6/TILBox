import React from 'react';
import ProfileImgSelector from '@/components/signup/ProfileImgSelector';
import { ComponentStory } from '@storybook/react';
import { mockApis } from '@mocks/apis';

export default {
  component: ProfileImgSelector,
  title: 'signup/ProfileImgSelector',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    msw: mockApis,
  },
};

const Template: ComponentStory<typeof ProfileImgSelector> = (args) => (
  <ProfileImgSelector {...args} />
);

export const Default = Template.bind({});

export const WithImg = Template.bind({});
WithImg.args = {
  img: 'https://avatars.githubusercontent.com/u/45786387?s=40&v=4',
};
