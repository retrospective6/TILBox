import React from 'react';
import RadioGroup from '@/components/common/RadioGroup';
import { ComponentStory } from '@storybook/react';
import { VISIBLE_LEVELS } from '@/constants';

export default {
  component: RadioGroup,
  title: 'common/RadioGroup',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'test',
  values: VISIBLE_LEVELS,
  checked: VISIBLE_LEVELS[0].value,
};
