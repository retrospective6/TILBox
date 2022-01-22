import React from 'react';
import ImgSelector from '@/components/common/ImgSelector';
import { ComponentStory } from '@storybook/react';
import { mockApis } from '@mocks/apis';

export default {
  component: ImgSelector,
  title: 'common/ImgSelector',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    msw: mockApis,
  },
};

const Template: ComponentStory<typeof ImgSelector> = (args) => (
  <ImgSelector {...args} />
);

export const Default = Template.bind({});
