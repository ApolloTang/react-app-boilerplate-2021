const pathResolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');


// ----------------------------
//    Configuration Setting
// ----------------------------
const title = 'react app';
const webpackDevServer_host = '0.0.0.0';
const webpackDevServer_port = '9090';
const absPathToSrc = pathResolve(__dirname, 'src');
const absPathToDist = pathResolve(__dirname, 'dist');
const absPathToFont = pathResolve(__dirname, 'src/common/fonts');


const webpackConfig = (env = {}) => {
  const _mode = (env.dev === true) ? 'development' : 'production';
  const {ifProduction} = getIfUtils(_mode);

  console.log('xxxx _mode: ', _mode)
  console.log('xxxx env: ', env)
  console.log('xxxx ifProduction: ', ifProduction('prod', 'dev'))

  const devServer = ifProduction( {}, {
    devServer: {
      host: webpackDevServer_host,
      port: webpackDevServer_port,
      historyApiFallback: true,
      stats: 'minimal',
      // writeToDisk: true
    }
  });

  const configOut = {
    ...devServer,
    mode: _mode,
    devtool: 'source-map',
    context: absPathToSrc,
    entry: {
      main: [
        './main.js'
      ]
    },
    output: ifProduction(
      {
        publicPath: '/',
        filename: '[name]-[chunkhash].js',
        path: absPathToDist,
        assetModuleFilename: 'assets/[hash][ext][query]'
      },
      {
        publicPath: '/',
        assetModuleFilename: 'assets/[hash][ext][query]'
      }
    ),
    resolve: {
      modules: [ absPathToSrc, 'node_modules']
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.js/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        // -- handle images --
        {
          test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
          type: 'asset/resource',
          generator: {
            filename: 'imgs/[hash][ext][query]'
          },
          exclude: absPathToFont
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
          use: [
            {
              loader: 'file-loader',
              options: {name: './fonts/[name].[ext]'}
            }
          ],
        },
        ifProduction(
          {
            test: /\.(css|less)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            exclude: [/node_modules/, /\.module\.(css|less)$/]
          },
          {
            test: /\.(css|less)$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "less-loader", options: { lessOptions: { strictMath: true } } },
            ],
            exclude: [/node_modules/, /\.module\.(css|less)$/]
          }
        ),
        ifProduction(
          {
            test: /\.module\.(css|less)$/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: "css-loader", options: { modules: { exportLocalsConvention: "camelCase" } } },
              { loader: 'less-loader'},
            ],
            exclude: /node_modules/
          },
          {
            test: /\.module\.(css|less)$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader", options: { modules: { exportLocalsConvention: "camelCase" } } },
              { loader: "less-loader", options: { lessOptions: { strictMath: true } } },
            ],
            exclude: /node_modules/
          }
        )
      ])
    },
    plugins: removeEmpty([
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        title: title
      }),
      ifProduction(
        new MiniCssExtractPlugin({
          filename: "[name]-[chunkhash].css",
        })
      )
    ])
  };
  console.log(configOut)
  return configOut;
};

module.exports = webpackConfig;
