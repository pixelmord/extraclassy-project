const path = require('path');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const CleanPlugin = require('clean-webpack-plugin')
const magicImporter = require('node-sass-magic-importer');


module.exports = {
  context: path.resolve(__dirname, 'source/'),
  entry: {
    extraclassy: './index.js',
    patternlab: './patternlab.js'
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      // Sass
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              importer: magicImporter(),
              includePaths: [
                path.resolve('./node_modules/')
              ]
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true
            }
          },
          'svgo-loader'
        ]
      }
    ]
  },
  output: {
    filename: process.env.NODE_ENV === 'development'
        ? '[name].js'
        : '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist/')
  },
  plugins: [
    // Clean dist folder before building
    new CleanPlugin(['dist']),

    // Extract CSS to its own file
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development'
          ? '[name].css'
          : '[name].[hash:8].css',
    }),

    // Create SVG sprite
    new SpriteLoaderPlugin()
  ]
}
