const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: {
    index: path.join(__dirname, '../examples/index.js'),
    es5: path.join(__dirname, '../examples/es5.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@babel/preset-react']
        },
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../examples/index.html'),
      chunks: ['index'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'es5.html',
      template: path.join(__dirname, '../examples/es5.html'),
      chunks: ['es5'],
      inject: true,
    }),
  ],
  resolve: {
    alias: {
      // 'ik-bridgex': path.resolve(__dirname, '../index.js'),
      'base-module-template': path.resolve(__dirname, '../src'),
    }
  },
  devServer: {
    port: 3801,
    host: '0.0.0.0',
    inline: true,
    hot: true,
    proxy: {

    }
  }
})
