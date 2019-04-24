// webpack v4
const path = require('path')
// update 23.12.2018
const nodeExternals = require('webpack-node-externals')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const WebpackMd5Hash = require('webpack-md5-hash')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    //  main: './src/index.js'
    index: path.resolve(__dirname, './src/index.js')
  },
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  // target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'postcss-loader',
      //     'sass-loader'
      //   ]
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('build', {}),
    // new MiniCssExtractPlugin({
    //   filename: 'style.[contenthash].css'
    // }),
    // new WebpackMd5Hash()
  ]
}
