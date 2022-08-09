const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const rewireBabelLoader = require("react-app-rewire-babel-loader");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  webpackConfig = rewireBabelLoader.include(
    webpackConfig,
    resolveApp("node_modules/@dfinity")
  );

  webpackConfig = rewireBabelLoader.include(
    webpackConfig,
    resolveApp("node_modules/tonweb")
  );

  webpackConfig.resolve.fallback = {
    url: require.resolve("url"),
    querystring: false,
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    path: require.resolve("path"),
    fs: false,
    os: false,
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
  };

  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return webpackConfig;
};
