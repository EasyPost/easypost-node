const chalk = require('chalk');
const webpack = require('webpack');
const path = require('path');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const externals = require('webpack-node-externals');

const sourceDir = './src/';
const extensions = ['.js', '.json'];
const destDir = './';
const input = 'easypost.js';
const output = 'easypost.js';
const cwd = `${process.cwd()}/`;

module.exports = {
  cache: true,
  target: 'node',
  externals: [ externals() ],
  devtool: 'source-map',
  context: path.join(cwd, sourceDir),
  entry: {
    js: path.join(cwd, sourceDir, input),
  },
  resolve: {
    extensions: extensions,
    modules: [
      path.join(cwd, 'node_modules'),
      path.join(cwd, sourceDir),
    ]
  },
  resolveLoader: {
    modules: [
      path.join(cwd, 'node_modules'),
    ]
  },
  output: {
    path: path.join(cwd, destDir),
    filename: output,
    libraryTarget: 'commonjs'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: [
            [ require.resolve('babel-preset-es2015'), {
              loose: true,
              modules: false
            } ],
            require.resolve('babel-preset-es2017'),
            require.resolve('babel-preset-stage-2'),
          ],
          plugins: [
            'babel-plugin-transform-class-properties',
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      clear: false,
      format: 'build [:bar] ' + chalk.green(':percent') + ' (:elapsed seconds)',
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
    }),
    //new webpack.ProgressPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      debug: true,
      output: {
        comments: false
      },
      sourceMap: true
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
  }
};
