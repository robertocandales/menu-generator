// next.config.js
const withImages = require('next-images');
module.exports = withImages();

module.exports = {
  reactStrictMode: true,
};
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
