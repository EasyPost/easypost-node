/* eslint import/no-extraneous-dependencies: 0 */
const { node, rules } = require('@easypost/build');

function config(output, nodestr) {
  const nodeConfig = node({
    entry: './src/easypost.js',
    outputDir: './',
  });

  // Replace rule with one that matches a specific node env
  nodeConfig.module.rules.splice(0, 1, rules.js({
    node: nodestr,
  }));

  nodeConfig.output.filename = output;

  return nodeConfig;
}

module.exports = [
  config('easypost.js', '6.9'),
  config('easypost.6-lts.js', '6.9'),
  config('easypost.8-lts.js', '8.9'),
  config('easypost.legacy.js', '0.10'),
];
