/**
 * Webpack 配置
 */

var path = require("path");
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'); //将多个入口文件的公用部分提取为common.js

module.exports = {
    plugins: [commonsPlugin],
    resolve: {
        root: [path.dirname() + '/src', path.dirname() + 'node_modules'],
        alias: {},
        extensions: ['', '.js', '.jsx']
    },

    entry: {
        app: './src/scripts/index.jsx'
    },

    output: {
        //path: path.dirname() + '/dist/scripts',
        filename: '[name].js'
        //publicPath: "/dist/scripts/"				//html引用路径，在这里是本地地址
    },

    module: {
      loaders: [{
          test: /\.js$/,
          loader: 'babel-loader'
      }, {
          test: /\.jsx$/,
          loader: 'babel-loader!jsx-loader?harmony'
      }]
    },

    externals: {
        //'jquery': 'jQuery'
        'react': 'React',
        'reactDom': 'ReactDOM'
    }
};