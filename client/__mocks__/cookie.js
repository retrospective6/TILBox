let cookies;

const cookie = {
  set(key, value) {
    if (!cookies) {
      return;
    }
    cookies[key] = value;
  },

  get(key) {
    return cookies && cookies[key];
  },

  remove(key) {
    this.set(key, '');
  },
};

export default cookie;

export function cookieDecorator(story, { parameters }) {
  cookies = null;
  if (parameters && parameters.cookie) {
    cookies = parameters.cookie;
  }
  return story();
}
