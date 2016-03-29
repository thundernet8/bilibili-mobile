/**
 * Webpack 配置
 */

var path = require("path");

module.exports = {
    resolve: {
        root: [path.dirname() + '/src', path.dirname() + 'node_modules'],
        alias: {},
        extensions: ['', '.js', '.jsx']
    },

    entry: {
        common: './src/scripts/common.js'
    },

    output: {
        //path: path.dirname() + '/dist/scripts',
        filename: '[name].js'
        //publicPath: "/js/"				//html引用路径，在这里是本地地址
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
    }
};