const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: './src/js/index.js',
    output: {
      filename: 'js/main.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      modules: [path.resolve(__dirname, './src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        reducers: path.resolve(__dirname, './src/reducers')
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            failOnError: argv.mode === 'production',
          },
        },
        {
          test: [/\.(js|jsx)$/],
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties'
              ],
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          test: [/.scss$/],
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets'
              }
            }
          ]
        },
        {
          test: /\.font\.js/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'webfonts-loader',
          ],
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Daniel\'s Site',
        template: './src/index.html',
        filename: "./index.html"
      }),
      new CopyWebpackPlugin([{
        from: './src/assets',
        to: 'assets'
      }]),
      new MiniCssExtractPlugin({
        filename: 'css/style.[contenthash].css'
      }),
      new StyleLintPlugin({
        configFile: '.stylelintrc.json',
        failOnError: argv.mode === 'production',
        files: '**/*.scss',
        syntax: 'scss',
      }),
    ]
  }
};
