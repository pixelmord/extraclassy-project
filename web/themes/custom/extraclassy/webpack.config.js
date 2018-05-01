const path = require('path');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CleanPlugin = require('clean-webpack-plugin');
const magicImporter = require('node-sass-magic-importer');
const merge = require('webpack-merge');

const baseConfig = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  context: path.resolve(__dirname, 'source/'),
  devtool: 'source-map',
  target: 'web',
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
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              importer: magicImporter(),
              sourceMap: true,
              includePaths: [
                path.resolve('./node_modules/'),
                path.resolve(__dirname, 'source/')
              ]
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: ['file-loader?name=[path][name].[ext]', 'image-webpack-loader']
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
};

module.exports = [
  merge(baseConfig, {
    entry: {
      extraclassy: './index.js',
      patternlab: './patternlab.js'
    }
  }),
  merge(baseConfig, {
    entry: {
      'components/main-menu':
        './components/02-components/menus/main-menu/index.js'
    }
  }),
  merge(baseConfig, {
    entry: {
      'components/menu':
        './components/02-components/menus/menu/index.js'
    }
  }),
  merge(baseConfig, {
    entry: {
      'components/tabs':
        './components/02-components/menus/tabs/index.js'
    }
  }),
  merge(baseConfig, {
    entry: {
      'components/pager':
        './components/02-components/pager/index.js'
    }
  }),
  merge(baseConfig, {
    entry: {
      'components/status':
        './components/02-components/status/index.js'
    }
  })
];
