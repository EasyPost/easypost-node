/* eslint import/no-extraneous-dependencies: 0 */
import { node, rules } from '@easypost/build';

function config(output, nodestr) {
  const nodeConfig = node({
    entry: './src/easypost.js',
    outputDir: './',
  });

  const jsRule = rules.js({
    node: nodestr,
  });

  jsRule.options.presets = jsRule.options.presets.filter(p => p[0] !== '@babel/preset-react');

  // Replace rule with one that matches a specific node env
  nodeConfig.module.rules.splice(0, 1, jsRule);

  nodeConfig.output.filename = output;

  return nodeConfig;
}

module.exports = [
  config('easypost.js', '6.9'),
  config('easypost.6-lts.js', '6.9'),
  config('easypost.8-lts.js', '8.9'),
  config('easypost.legacy.js', '0.10'),
];
