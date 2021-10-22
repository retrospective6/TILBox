import React from 'react';
import Button from '@/components/Button';
import { ComponentStory } from '@storybook/react';

export default {
  component: Button,
  title: 'Button',
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => console.log('clicked'),
  text: 'Button',
  theme: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  theme: 'secondary',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Primary.args,
  theme: 'warning',
};

export const Wide = Template.bind({});
Wide.args = {
  ...Primary.args,
  width: '266px',
};
