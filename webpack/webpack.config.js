const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig); // <--- merged

  config.plugins.push(
    new Dotenv() // Add Dotenv plugin to load environment variables from .env file
  );

  return config;
};
