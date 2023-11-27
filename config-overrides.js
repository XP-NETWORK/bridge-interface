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
        zlib: require.resolve("browserify-zlib"),
    };

    webpackConfig.ignoreWarnings = [/Failed to parse source map/];

    /* webpackConfig.resolve.alias = {
    ...webpackConfig.resolve.alias,
    "@hashgraph/proto": "@hashgraph/proto/lib/proto.js",
  };*/

    webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
        if (rule.oneOf instanceof Array) {
            rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/];
        }
        return rule;
    });

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
