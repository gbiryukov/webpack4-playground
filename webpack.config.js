const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AsyncChunkNamesPlugin = require('webpack-async-chunk-names-plugin');

const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: SRC_DIR,
  output: {
    path: DIST_DIR,
    filename: `js/[name].${isProd ? '[chunkhash:8]' : '[id]'}.js`,
  },
  module: {
    rules: [
      // App script files
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        use: [{ loader: 'babel-loader'}],
      },
      // App styles
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:8]',
            }
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name: 'vendors',
          test: /node_modules/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new AsyncChunkNamesPlugin(),
  ],
};
