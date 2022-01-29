import { StoryContext } from '@storybook/react';

let cookies: { [keys in string]: string } = {};

const cookie = {
  set(key: string, value: string): void {
    cookies[key] = value;
  },

  get(key: string): string | undefined {
    return cookies[key];
  },

  remove(key: string): void {
    this.set(key, '');
  },
};

export default cookie;

export function cookieDecorator(
  story: () => unknown,
  { parameters }: StoryContext,
): unknown {
  cookies = {};
  if (parameters && parameters.cookie) {
    cookies = parameters.cookie;
  }
  return story();
}
