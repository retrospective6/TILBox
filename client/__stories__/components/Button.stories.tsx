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

export const Primary = Template.bind({});
Primary.args = {
  text: 'Button',
  theme: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  theme: 'secondary',
};

export const Danger = Template.bind({});
Danger.args = {
  ...Primary.args,
  theme: 'danger',
};

export const Wide = Template.bind({});
Wide.args = {
  ...Primary.args,
  width: '266px',
};
