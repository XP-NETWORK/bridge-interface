const path = require("path");
const fs = require("fs");
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

  return webpackConfig;
};
