const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: "source-map",
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 8080
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pcss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'resolve-url-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true}
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(png|jpg|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        test:/\.twig$/,
        use: [
          'raw-loader',
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                layouts: path.resolve(__dirname, './src/layouts'),
                components: path.resolve(__dirname, './src/components')
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'core.css',
    }),
    new StylelintPlugin({
      files: '**/*.(s|p)?(a|c)ss'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index.twig'
    })
  ],
};
