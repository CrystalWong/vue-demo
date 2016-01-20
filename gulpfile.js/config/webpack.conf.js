var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var config = require('./');

module.exports = function(env){
    var webpackConfig = {
        entry: 'src/assets/javascripts/main.js',
        output: {
            path: 'dist/assets/javascripts',
            publicPath: 'dist/assets/',
            filename: '[name].js'
        },
        resolve: {
            extensions: ['', '.js','.min.js','.vue'],
            alias: {
                'src': config.sourceDirectory,
                'dist': config.publicDirectory
            }
        },
        module: {
            loaders: [
                {
                    test: /\.vue$/,
                    loader: 'vue'
                },
                {
                    test: /\.js$/,
                    loader: 'babel!eslint',
                    exclude: /node_modules/
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'url',
                    query: {
                        limit: 1000000,
                        name: '[name].[ext]?[hash]'
                    }
                }
            ]
        },
        vue: {
            loaders: {}
        }
    };

    if(env === 'development') {
        webpackConfig.devtool = 'eval-source-map';
        webpack.debug = true;
    }

    if(env === 'production'){
        webpackConfig.devtool = 'source-map';

        webpackConfig.vue.loaders = {
            js: 'babel!eslint',
            // http://vuejs.github.io/vue-loader/configurations/extract-css.html
            css: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            less: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
            sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
            stylus: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
        };

        // http://vuejs.github.io/vue-loader/workflow/production.html
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new ExtractTextPlugin('components.css'),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin()
        ]);
    }

    return webpackConfig;
};
