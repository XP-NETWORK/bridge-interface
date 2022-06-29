module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...

  config.resolve.extensions = [...config.resolve.extensions, ".mjs"];

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    },
  ];

  return config;
};
