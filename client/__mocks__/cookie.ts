import { StoryContext } from '@storybook/react';

let cookies: { [keys in string]: string } = {};

const cookie = {
  set(key: string, value: string) {
    cookies[key] = value;
  },

  get(key: string) {
    return cookies[key];
  },

  remove(key: string) {
    this.set(key, '');
  },
};

export default cookie;

export function cookieDecorator(story: any, { parameters }: StoryContext) {
  cookies = {};
  if (parameters && parameters.cookie) {
    cookies = parameters.cookie;
  }
  return story();
}
