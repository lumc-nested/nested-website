'use strict';


var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


// Detect if we're running webpack dev server or building a distribution.
var devServer = path.basename(require.main.filename) === 'webpack-dev-server.js';


var config = {
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin('styles.css')
  ],

  entry: './scripts/init.jsx',

  output: {
    filename: 'main.js',
    path: 'dist/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    // JSZip is bundled with xlsx as a pre-built javascript file.
    noParse: [/\/jszip\.js$/],

    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }],

    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules(?!\/nested-editor)/,
      loaders: ['babel?' + JSON.stringify({
        presets: ['es2015', 'react', 'stage-1'],
        plugins: ['transform-runtime'],
        cacheDirectory: true
      })]
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.less$/,
      // The mergeRules transformation breaks our zoom slider thumb.
      // https://github.com/ben-eb/postcss-merge-rules/issues/18
      loader: ExtractTextPlugin.extract('style', ['css?-mergeRules', 'less'])
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.pegjs$/,
      loader: 'pegjs'
    }, {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff2'
    }, {
      test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }]
  },

  cache: false,
  debug: false,
  devtool: false
};


if (devServer) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'})
  );
  config.entry = [
    'webpack/hot/only-dev-server',
    './scripts/init.jsx'
  ];
  config.devServer = {
    hot: true
  };
  config.output.publicPath = '/dist/';
  config.module.loaders[0].loaders.unshift('react-hot');
  config.cache = true;
  config.debug = true;
  config.devtool = 'eval';
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {drop_console: false}}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'})
  );
}


module.exports = config;
