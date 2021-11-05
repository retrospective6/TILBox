import React from 'react';
import Header from '@/components/Header';
import { ComponentStory } from '@storybook/react';

export default {
  component: Header,
  title: 'Header',
};

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
