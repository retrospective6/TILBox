/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_HOST: process.env.API_HOST,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'localhost'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
