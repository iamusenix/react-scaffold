'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js')();

var devConfig = {
    mode: 'production',
    devtool: false,

    output: {
        filename: 'scripts/[name].[chunkhash:4].js',
        chunkFilename: 'scripts/[name].[chunkhash:4].js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(process.env.ENV),
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'API_HOST': JSON.stringify('app.sharetome.com')
            }
        })
    ],
    stats: {
        assets: true,
        assetsSort: "field",
        cached: true,
        colors: true,
        chunks: true,
        chunkModules: true,
        errors: true,
        errorDetails: true,
        modules: true,
        timings: true,
    }

};


module.exports = merge(baseConfig, devConfig);