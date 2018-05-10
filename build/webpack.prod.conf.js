const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const fileName = isProd ? 'axios-service.min' : 'axios-service'

module.exports = merge(baseConfig, {
  mode: isProd ? 'production' : 'none',
  entry: { 
    [fileName]: path.join(__dirname, '../src/index.js') 
  },
  output: {
    library: 'axiosService',
    libraryTarget: 'umd',
    filename: `${fileName}.js`,
    auxiliaryComment: {
      root: 'libaoxu'
    },
    globalObject: 'typeof self !== "undefined" ? self : this'
    // libraryExport: 'default'
  },
  devtool: 'source-map',
  plugins: [
  ]
})