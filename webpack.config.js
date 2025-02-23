const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets, ver } = { mode: "production", presets: [], ver: "" }) => {
  return webpackMerge({
    entry: {
      "main": './src/index.ts',
      "worker": "./src/worker/index.ts"
    },
    mode,
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          exclude: [
          ],
          enforce: "pre",
        },
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|bmp)$/,
          use: [{
            loader: 'file-loader',
            options: {
              emitFile: true
            }
          }]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: '[name].js',
      sourceMapFilename: '[file].map',
      path: path.resolve(__dirname, 'build'),
    },
    /*optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },*/
    plugins: [
      new webpack.DefinePlugin({
        VERSION_SUFFIX: JSON.stringify(ver),
      })
    ]
  },
  modeConfig(mode)
  );
};
