/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const nodeExternals = require('webpack-node-externals');


const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports = {
  entry: './src/easypost.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'easypost.js',
  },
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
  },
};
