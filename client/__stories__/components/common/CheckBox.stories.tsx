import React from 'react';
import CheckBox from '@/components/common/CheckBox';
import { ComponentStory } from '@storybook/react';
import styled from '@emotion/styled';
import FONT from '@/styles/font';

export default {
  component: CheckBox,
  title: 'common/CheckBox',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Container = styled.div`
  ${FONT.caption1};
`;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <Container>
    폰트 크기는 상위에서 설정 가능합니다.
    <CheckBox {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  label: '미작성 시 이메일 수신 동의 및 발송 설정',
};
