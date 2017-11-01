const webpack = require('webpack');
const path = require('path');

const externals = require('webpack-node-externals');

const sourceDir = './src/';
const extensions = ['.js', '.json'];
const destDir = './';
const input = 'easypost.js';
const cwd = `${process.cwd()}/`;

function config(output, nodestr) {
  return {
    // cache: true,
    target: 'node',
    externals: [externals()],
    devtool: 'source-map',
    context: path.join(cwd, sourceDir),
    entry: {
      js: path.join(cwd, sourceDir, input),
    },
    resolve: {
      extensions,
      modules: [
        path.join(cwd, 'node_modules'),
        path.join(cwd, sourceDir),
      ],
    },
    resolveLoader: {
      modules: [
        path.join(cwd, 'node_modules'),
      ],
    },
    output: {
      path: path.join(cwd, destDir),
      filename: output,
      libraryTarget: 'commonjs',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            // cacheDirectory: true,
            babelrc: false,
            presets: [
              ['env', {
                targets: {
                  node: nodestr,
                },
                debug: true,
                exclude: [
                  'transform-async-to-generator',
                  'transform-regenerator',
                ],
                include: [
                  // TEMPORARY: until babel v7 is out.
                  // https://github.com/babel/babel/issues/3930
                  'transform-es2015-classes',
                ],
              }],
              'stage-2',
              ['minify', {
              }],
            ],
            plugins: [
              'transform-class-properties',
              ['fast-async', {
                useRuntimeModule: true,
              }],
            ],
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
      }),
    ],
    node: {
      global: false,
      process: false,
      Buffer: false,
      crypto: false,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: false,
      setTimeout: false,
      os: false,
      _filename: true,
      __dirname: true,
    },
  };
}

module.exports = [
  config('easypost.js', '6.9'),
  config('easypost.6-lts.js', '6.9'),
  config('easypost.8-lts.js', '8.9'),
  config('easypost.legacy.js', '0.10'),
];
