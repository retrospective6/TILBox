import React from 'react';
import RadioButton from '@/components/common/RadioButton';
import { ComponentStory } from '@storybook/react';

export default {
  component: RadioButton,
  title: 'common/RadioButton',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof RadioButton> = (args) => (
  <RadioButton {...args} />
);

export const Checked = Template.bind({});
Checked.args = {
  name: 'test',
  value: 'public',
  label: '전체설정',
  checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  name: 'test',
  value: 'private',
  label: '나만보기',
};
