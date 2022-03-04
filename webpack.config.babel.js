/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'easypost.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'easypost.js',
    libraryTarget: 'commonjs', // TODO: In Webpack 5, there is a new `library` property up one level
  },
  context: path.resolve(__dirname, 'src'),
  mode,
  cache: isDev,
  devtool: isDev ? 'source-map' : undefined,
  target: 'node', // TODO: In Webpack 5, replace this line with `externalsPresets: { node: true },`
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, './node_modules')],
  },
};
