/**
 * Webpack 配置
 */

var path = require("path/path");
var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'); //将多个入口文件的公用部分提取为common.js

module.exports = {
    //plugins: [commonsPlugin],
    resolve: {
        root: [path.dirname() + '/src', path.dirname() + 'node_modules'],
        alias: {},
        extensions: ['', '.js', '.jsx']
    },

    entry: {
        app: './src/scripts/app.js'
    },

    output: {
        //path: path.dirname() + '/dist/scripts',
        filename: '[name].js'
        //publicPath: "/dist/scripts/"				//html引用路径，在这里是本地地址
    },

    module: {
      loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
          //query: {
          //    presets: ['es2015']
          //}
      }, {
          test: /\.jsx$/,
          //loader: 'babel-loader!jsx-loader?harmony',
          loader: 'babel-loader',                       //- babel-loader已经实现了JSX编译
          exclude: /node_modules/
          //exclude: /(node_modules|bower_components)/
          //query: {
          //    presets: ['es2015', 'react']
          //}
      }]
    },

    externals: {
        'jquery': 'jQuery',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'comment-manager': 'CommentManager',
        'bilibili-parser': 'BilibiliParser'
        //'video-js': 'videojs'
    }
};