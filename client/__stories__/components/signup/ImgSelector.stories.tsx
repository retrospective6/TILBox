import React from 'react';
import ImgSelector from '@/components/signup/ImgSelector';
import { ComponentStory } from '@storybook/react';

export default {
  component: ImgSelector,
  title: 'signup/ImgSelector',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof ImgSelector> = (args) => (
  <ImgSelector {...args} />
);

export const Default = Template.bind({});

export const WithImg = Template.bind({});
WithImg.args = {
  img: 'https://avatars.githubusercontent.com/u/45786387?s=40&v=4',
};
