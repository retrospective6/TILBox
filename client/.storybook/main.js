const path = require('path');

module.exports = {
  stories: ['../__stories__/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
  ],
  core: {
    builder: 'webpack5',
  },
  features: {
    postcss: false,
  },
  webpackFinal: async (config) => {
    config.resolve.extensions.push('.ts', '.tsx');

    config.resolve.alias['@/utils/cookie'] = require.resolve(
      '../__mocks__/cookie.ts',
    );
    config.resolve.alias['@/utils/days'] = require.resolve(
      '../__mocks__/days.ts',
    );
    config.resolve.alias['@'] = path.resolve(__dirname, '../src/');
    config.resolve.alias['@mocks'] = path.resolve(__dirname, '../__mocks__/');

    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    return config;
  },
};
