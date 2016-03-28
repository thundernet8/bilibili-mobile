/**
 * Webpack 配置
 */

module.exports = {
    resolve: {
        root: [process.cwd() + '/src', process.cwd() + 'node_modules'],
        alias: {},
        extensions: ['', '.js', '.jsx']
    },

    entry: {
        xxx: './src/scripts/xxx.js'
    },

    output: {
        filename: '[name].js'
    },

    externals: {
        //'jquery': 'jQuery'
    }
};