'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const vuxLoader = require('vux-loader')
const vueLoaderConfig = require('./vue-loader.conf')

const env = require('../config/prod.env')
const mode = 'production'//模式
const _webpackConfig = merge(baseWebpackConfig, {
  mode,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].js?_=[chunkhash]'),
    chunkFilename: utils.assetsPath('js/[id].js?_=[chunkhash]')
  },
  module: {
    rules: [...utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    }), {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig(mode)
    }]
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
      }),
      // 压缩css文件
      new OptimizeCSSAssetsPlugin({
        // 采用了文件名后接查询参数的方式解决缓存问题，再打包的时候，css压缩找不到正确的文件名了，需要重新配置规则
        assetNameRegExp: /\.css\?_=[a-z0-9]*$/g
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
      'CONTEXT_PATH': JSON.stringify(config.build.assetsPublicPath)
    }),
    new MiniCssExtractPlugin({
      path: utils.assetsPath('css'),
      filename: '[name].css?_=[chunkhash]',
      chunkFilename: utils.assetsPath('css/[id].css?_=[chunkhash]')
    }),
    new webpack.NoEmitOnErrorsPlugin(),

    // 复制静态资源到目录中，如果有更多需要复制的资源，请在这里添加
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

const webpackConfig = vuxLoader.merge(_webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
module.exports = webpackConfig
