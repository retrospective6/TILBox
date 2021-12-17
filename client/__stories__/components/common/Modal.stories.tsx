import React from 'react';
import Modal from '@/components/common/Modal';
import { ComponentStory } from '@storybook/react';

export default {
  component: Modal,
  title: 'common/Modal',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>{args.children}</Modal>
);

export const Default = Template.bind({});
Default.args = {
  title: '모달창',
  children: <div>here will be come content!</div>,
};
