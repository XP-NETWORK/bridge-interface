const webpack = require("webpack");

module.exports = function override(webpackConfig) {
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
    "@multiversx/sdk-core": require.resolve("@multiversx/sdk-core"),
  };

  webpackConfig.ignoreWarnings = [/Failed to parse source map/];

  /* webpackConfig.resolve.alias = {
    ...webpackConfig.resolve.alias,
    "@hashgraph/proto": "@hashgraph/proto/lib/proto.js",
  };*/

  webpackConfig.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return webpackConfig;
};
