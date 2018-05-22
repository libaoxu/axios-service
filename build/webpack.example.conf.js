const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: { index: path.join(__dirname, '../examples/index.js') },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../examples/index.html'),
      inject: true,
    }),
  ],
  resolve: {
    alias: {
      // 'axios-service': path.resolve(__dirname, '../src/index.js')
      'axios-service': path.resolve(__dirname, '../dist/axios-service.js')
    }
  },
  devServer: {
    port: 3800,
    host: '0.0.0.0',
    inline:true,
    hot: true,
    proxy: {

    }
  }
})