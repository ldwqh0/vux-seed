'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js?_=[chunkhash]'),
    chunkFilename: utils.assetsPath('js/[id].js?_=[chunkhash]')
  },
  mode: 'production',//模式
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all' //代码切分
    },
    minimizer: [
      // 对js文件进行压缩
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        uglifyOptions: {
          sourceMap: true,
          mangle: false //
        }
      })
    ]
  },
  // devtool: config.build.productionSourceMap ? config.build.devtool : false,

  externals: {},
  plugins: [
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: utils.resolve('index.html'),
      inject: true,
      minify: {
        removeComments: true,//移除注释
        collapseWhitespace: true, //合并多余空格
        removeAttributeQuotes: true//移除分号
        // 更多选项请参见:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      'process.env': env,
      'CONTEXT_PATH': config.build.assetsPublicPath
    }),
    new MiniCssExtractPlugin({
      path: utils.assetsPath('css'),
      filename: '[name].css?_=[chunkhash]',
      chunkFilename: utils.assetsPath('css/[id].css?_=[chunkhash]')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    //压缩css文件
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? {safe: true, map: {inline: false}}
        : {safe: true}
    }),
    // 复制静态资源到目录中，如果有更多需要复制的资源，请在这里添加
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // keep module.id stable when vender modules does not change
    // new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    // new webpack.optimize.ModuleConcatenationPlugin()
  ]
})

// if (config.build.productionGzip) {
//   const CompressionWebpackPlugin = require('compression-webpack-plugin')
//
//   webpackConfig.plugins.push(
//     new CompressionWebpackPlugin({
//       asset: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: new RegExp(
//         '\\.(' +
//         config.build.productionGzipExtensions.join('|') +
//         ')$'
//       ),
//       threshold: 10240,
//       minRatio: 0.8
//     })
//   )
// }
//
// if (config.build.bundleAnalyzerReport) {
//   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//   webpackConfig.plugins.push(new BundleAnalyzerPlugin())
// }

module.exports = webpackConfig
