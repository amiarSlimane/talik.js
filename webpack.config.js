const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const getPackageJson = require('./scripts/getPackageJson');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const {
  version,
  name,
  license,
  repository,
  author,
} = getPackageJson('version', 'name', 'license', 'repository', 'author');

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *<[^)]*> */g, " ")} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: './src/lib/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: "talik",
    libraryTarget: 'umd',
    
    clean: true
  },
  node: false,
  mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizerPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.(m|j|t)s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
          // {
          //   loader: "sass-loader",
            // options: {
            //   modules: {
            //     mode: "local",
            //     auto: true,
            //     exportGlobals: true,
            //     localIdentName: "[path][name]__[local]--[hash:base64:5]",
            //     localIdentContext: path.resolve(__dirname, "src"),
            //     localIdentHashSalt: "my-custom-hash",
            //     namedExport: true,
            //     exportLocalsConvention: "camelCase",
            //     exportOnlyLocals: false,
            //   },
            // },
          // },
        ],
        
      },
      {

        test: /\.(png|svg|jpg|jpeg|gif)$/i,
  
        type: 'asset/resource',
  
      },
      { 
        test: /\.handlebars$/, 
        loader: "handlebars-loader",
        options: {
          knownHelpersOnly: false,
          inlineRequires: '\/assets/icons\/'
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.scss'
    }),
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      SERVICE_URL: JSON.stringify('https://talik.io')
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};