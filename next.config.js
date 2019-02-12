require('dotenv').config();
const fs = require('fs');
const path = require('path');
const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');

const webpack = (config, { isServer }) => {
  if (process.env.ANALYZE) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      })
    );
  }

  // This is to bypass an issue where css modules composes would not update
  // see https://stackoverflow.com/questions/41518465/composes-not-working-with-babel-plugin-react-css-modules
  config.module.rules = config.module.rules.map(rule => {
    if (rule.use.loader && rule.use.loader === 'next-babel-loader') {
      rule.use.options.cacheDirectory = false;
    }
    return rule;
  });

  return config;
};

const webpackDevMiddleware = (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['./**/*.js' ]
    };
    return config
}

module.exports = withTypescript(
  withCSS({
    webpack,
    webpackDevMiddleware,
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    },
    serverRuntimeConfig: {
      defaultHost: process.env.DEFAULT_HOST,
    },
    publicRuntimeConfig: {
      NODE_ENV: process.env.NODE_ENV,
      graphqlApiEndpoint: process.env.COMMUNITIES_GRAPHQL_ENDPOINT
    }
  })
);
