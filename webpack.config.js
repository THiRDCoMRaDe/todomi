const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/',
   },
   module: {
      rules: [
         { test: /\.js$/, use: 'babel-loader' },
         {
            test: /\.s?css$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
               },
               {
                  loader: 'css-loader',
                  options: {
                     sourceMap: true,
                  },
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true,
                  },
               },
            ],
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
         template: 'src/index.html',
      }),
   ],
   devServer: {
      /*historyApiFallback: true,*/
      historyApiFallback: {
         disableDotRule: true,
      },
   },
};
