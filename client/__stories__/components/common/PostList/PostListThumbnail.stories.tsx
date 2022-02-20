import React from 'react';
import PostListThumbnail from '@/components/common/PostList/PostListThumbnail';
import { ComponentStory } from '@storybook/react';
import styled from '@emotion/styled';

export default {
  component: PostListThumbnail,
  title: 'common/PostList/PostListThumbnail',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Container = styled.div`
  width: 264px;
  height: 170px;
`;

const Template: ComponentStory<typeof PostListThumbnail> = (args) => (
  <Container>
    <PostListThumbnail {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  title: '여덟글자하이용',
  thumbnail: {
    type: 'gradation',
    value: { start: '#D45438', end: '#FEA768' },
  },
};

export const MediumText = Template.bind({});
MediumText.args = {
  title: '여덞글자초과열두글자이하',
  thumbnail: {
    type: 'gradation',
    value: { start: '#D45438', end: '#FEA768' },
  },
};

export const LongerText = Template.bind({});
LongerText.args = {
  title: '열두글자를 초과하면 두줄이 되면서 뒤에는 줄임말이 들어가요.',
  thumbnail: {
    type: 'gradation',
    value: { start: '#D45438', end: '#FEA768' },
  },
};

export const Image = Template.bind({});
Image.args = {
  title: '고양이는 귀엽다',
  thumbnail: {
    type: 'image',
    value:
      'https://user-images.githubusercontent.com/45786387/146191310-689f2ed9-e6b8-4e1d-9193-4c5bd0804c50.png',
  },
};
