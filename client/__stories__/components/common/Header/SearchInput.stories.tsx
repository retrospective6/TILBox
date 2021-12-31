import React from 'react';
import SearchInput from '@/components/common/Header/SearchInput';
import { ComponentStory } from '@storybook/react';

export default {
  component: SearchInput,
  title: 'common/Header/SearchInput',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: '아이디, 닉네임, 태그, 텍스트와 본문을 검색해볼 수 있습니다',
};
