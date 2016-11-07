'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');
const BundleTracker = require('webpack-bundle-tracker');
const loaders = [
  { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader" ) },
  { test: /\.css$/,  loader: ExtractTextPlugin.extract("style-loader", "css") },
  { test: /\.js$/, loaders: ['happypack/loader'], include: path.join(__dirname, 'src') },
  { test: /\.json(\?v=\d+\.\d+\.\d+)?$/,   loader: 'json' },
  { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'file?limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: 'file?limit=10000&mimetype=application/font-woff' },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&mimetype=image/svg+xml' },
];
const postcss = {
  defaults: [
    require("postcss-cssnext"),
    autoprefixer({
      browsers: ['last 4 versions']
    })
  ]
};
const entries = {
  shorterly: './src/containers/shorterly',
};

module.exports = {

  devtool: 'source-map',

  entry: entries,

  output: {
    path: path.join(__dirname, 'static/dist'),
    filename: '[name]-[hash].js',
    publicPath: '/static/dist/'
  },

  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.less'],
  },

  plugins: [
    new HappyPack({
      loaders: ['babel?presets[]=es2015']
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
      // compress: {
        // warnings: false,
        // dead_code: true,
        // conditionals: true,
        // booleans: true,
        // unused: true,
        // if_return: true,
        // join_vars: true,
        // drop_console: false
      // },
      // mangle: true,
      // sequences: true,

      // minimize: true
    // }),
    new webpack.optimize.DedupePlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin('[name]-[hash].css'),
  ],
  postcss,

  module: {
    loaders: loaders
  }
};

