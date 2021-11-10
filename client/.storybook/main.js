const path = require('path');

module.exports = {
  stories: ['../__stories__/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
  ],
  features: {
    postcss: false,
  },
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src/');
    config.resolve.alias['@mocks'] = path.resolve(__dirname, '../__mocks__/');
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
