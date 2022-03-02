const path = require('path');


const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports = {
  entry: './src/easypost.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'easypost.js',
  },
  mode,
  target: 'node', // TODO: In webpack 5 you can specify the version in this string
  cache: isDev,
  devtool: isDev ? 'source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env'],
          //   plugins: [
          //     '@babel/plugin-proposal-export-namespace-from',
          //     ['@babel/plugin-proposal-class-properties', {
          //       loose: false,
          //     }],
          //     '@babel/plugin-proposal-export-default-from',
          //     '@babel/plugin-syntax-export-extensions',
          //     'babel-plugin-transform-export-extensions',
          //     '@babel/plugin-proposal-optional-chaining',
          //     '@babel/plugin-proposal-nullish-coalescing-operator',
          //   ],
          // },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
