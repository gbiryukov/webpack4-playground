const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AsyncChunkNamesPlugin = require('webpack-async-chunk-names-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { isProd, ifProd } = require('./webpack/envHelpers');

const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

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
          { loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader' },
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
    runtimeChunk: {
      name: 'runtime',
    },
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
        },
        ...ifProd({
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          }
        })
      },
    },
  },
  plugins: _.compact([
    new HtmlWebpackPlugin({
      inlineSource: ifProd('(runtime|styles.*.js)'),
    }),
    new AsyncChunkNamesPlugin(),
    new HtmlWebpackInlineSourcePlugin(),
    ifProd(new SuppressChunksPlugin([
      'runtime',
      { name: 'styles', match: /\.js$/ },
    ])),
    new MiniCssExtractPlugin({
      filename: `css/[name].${isProd ? '[contenthash:8]' : '[id]'}.css`,
      chunkFilename: `css/[name].${isProd ? '[contenthash:8]' : '[id]'}.css`,
    }),
    ifProd(new webpack.HashedModuleIdsPlugin()),
    ifProd(new BundleAnalyzerPlugin()),
  ]),
};
