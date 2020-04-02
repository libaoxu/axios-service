const path = require('path');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

const isProd = process.env.NODE_ENV === 'production';
const filename = isProd ? 'base-module-template.production.min.js' : 'base-module-template.development.js';

module.exports = merge(baseConfig, {
  entry: './src/index.js',
  mode: isProd ? 'production' : 'development',
  output: {
    filename,
    path: path.resolve('./dist'),
    library: 'base-module-template',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
});
