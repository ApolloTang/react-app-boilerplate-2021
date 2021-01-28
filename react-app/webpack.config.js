const pathResolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

const webpackConfig = (env = {}) => {
  const _mode = env.mode || 'production';
  const {ifProduction} = getIfUtils(_mode);

  const devServer = ifProduction( {}, {
    devServer: {
      host: webpackDevServer_host,
      port: webpackDevServer_port,
      historyApiFallback: true,
      stats: 'minimal'
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
        path: absPathToDist
      },
      {
        publicPath: '/'
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
    ])
  };
  console.log(configOut)
  return configOut;
};

module.exports = webpackConfig;
