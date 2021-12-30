import React from 'react';
import DateList from '@/components/mybox/DateList';
import { ComponentStory } from '@storybook/react';

export default {
  component: DateList,
  title: 'mybox/DateList',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof DateList> = (args) => (
  <DateList {...args} />
);

export const Days31 = Template.bind({});
Days31.args = {
  year: 2021,
  month: 12,
  postDates: [2, 6, 7, 12, 13, 14, 17, 18, 19, 20],
};

export const Days30 = Template.bind({});
Days30.args = {
  year: 2021,
  month: 11,
  postDates: [2, 6, 7, 12, 13, 14, 17, 18, 19, 20],
};

export const Days29 = Template.bind({});
Days29.args = {
  year: 2020,
  month: 2,
  postDates: [2, 6, 7, 12, 13, 14, 17, 18, 19, 20],
};
