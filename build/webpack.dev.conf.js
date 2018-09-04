'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
const mode = 'development'//模式
const ArcGISPlugin = require('@arcgis/webpack-plugin')

const _devWebpackConfig = merge(baseWebpackConfig, {
  mode,
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        usePostCSS: true
      }), {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig(mode)
      }]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /./,
        to: config.dev.assetsPublicPath
      }]
    },
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      'CONTEXT_PATH': JSON.stringify(config.dev.assetsPublicPath)
    }),
    new ArcGISPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.resolve('index.html'),
      inject: true
    }),
  ]
})

const devWebpackConfig = vuxLoader.merge(_devWebpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}${config.dev.assetsPublicPath}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
