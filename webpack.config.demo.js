const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  entry: './src/demo/index.ts',
  output: {
    filename: 'index.js'
  },
  optimization: {
    minimize: false,
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    port: 9000
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
          "sass-loader",
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
    //   {
    //     test: /\.svg$/,
    //     loader: 'svg-inline-loader'
    // }
    // {
    //   test: /\.(png|jpg|gif)$/i,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 8192,
    //       }
    //     },
    //   ],

    //  type: 'javascript/auto'
    // },
   
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.scss'
    }),
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};