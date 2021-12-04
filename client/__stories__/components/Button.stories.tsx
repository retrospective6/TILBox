import React from 'react';
import Button from '@/components/Button';
import { ComponentStory } from '@storybook/react';

export default {
  component: Button,
  title: 'Button',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  variant: 'default',
  size: 'small',
};

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args,
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  variant: 'secondary',
};

export const Third = Template.bind({});
Third.args = {
  ...Default.args,
  variant: 'third',
};

export const Danger = Template.bind({});
Danger.args = {
  ...Default.args,
  variant: 'danger',
};

export const Medium = Template.bind({});
Medium.args = {
  ...Default.args,
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: 'large',
};

export const Wide = Template.bind({});
Wide.args = {
  ...Default.args,
  width: '266px',
};
