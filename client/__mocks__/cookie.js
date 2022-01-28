let cookies = {};

const cookie = {
  set(key, value) {
    cookies[key] = value;
  },

  get(key) {
    return cookies[key];
  },

  remove(key) {
    this.set(key, '');
  },
};

export default cookie;

export function cookieDecorator(story, { parameters }) {
  cookies = {};
  if (parameters && parameters.cookie) {
    cookies = parameters.cookie;
  }
  return story();
}
