const path = require('path')

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'web/'),
  entry: {
    base_theme: './themes/base_theme/src/index.js',
    custom_module: './modules/custom_module/src/index.js'
  },
  resolve: {
    alias: {
      Lib: path.resolve(__dirname, 'lib/')
    }
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
              includePaths: [
                path.resolve(__dirname, 'node_modules/compass-mixins/lib/')
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
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/')
  },
  plugins: [
    // Clean dist folder before building
    new CleanPlugin(['dist']),

    // Extract CSS to its own file
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    // Create SVG sprite
    new SpriteLoaderPlugin()
  ]
}
