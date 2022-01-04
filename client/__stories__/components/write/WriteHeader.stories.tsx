import React from 'react';
import WriteHeader from '@/components/write/WriteHeader';
import { ComponentStory } from '@storybook/react';

export default {
  component: WriteHeader,
  title: 'write/WriteHeader',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof WriteHeader> = (args) => (
  <WriteHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  state: 'default',
  message: '(당근마켓)님의 31번째 TIL 작성 중...',
};

export const ERROR = Template.bind({});
ERROR.args = {
  state: 'error',
  message: '제목은 30자 이하만 작성 가능합니다',
};
