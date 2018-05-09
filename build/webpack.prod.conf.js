const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(baseConfig, {
  mode: isProd ? 'production' : 'none',
  entry: { 
    [isProd ? 'axios-service.min' : 'axios-service']: path.join(__dirname, '../src/index.js') 
  },
  output: {
    library: 'axiosService',
    libraryTarget: 'umd'
  },
  plugins: [
  ]
})