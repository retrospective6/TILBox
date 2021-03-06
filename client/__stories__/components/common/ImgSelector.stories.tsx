import React from 'react';
import ImgSelector from '@/components/common/ImgSelector';
import { ComponentStory } from '@storybook/react';

export default {
  component: ImgSelector,
  title: 'common/ImgSelector',
};

const Template: ComponentStory<typeof ImgSelector> = (args) => (
  <ImgSelector {...args} />
);

export const Default = Template.bind({});
