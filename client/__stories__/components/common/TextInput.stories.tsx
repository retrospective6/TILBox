import React from 'react';
import TextInput from '@/components/common/TextInput';
import { ComponentStory } from '@storybook/react';

export default {
  component: TextInput,
  title: 'common/TextInput',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'My TIL 주소',
  placeholder: 'www.tilbox/til356list',
  hint: '숫자, 영어를 조합해 나만의 TIL 주소를 만들 수 있습니다.',
  width: '320px',
  height: '30px',
  rules: [
    {
      rule: (value: string) => value === '',
      message: '필수적으로 입력해야 합니다.',
    },
  ],
};
