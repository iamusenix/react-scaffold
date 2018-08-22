'use strict';

var webpack = require('webpack');
const merge = require('webpack-merge');

var baseConfig = require('./webpack.config.base.js')();

var devConfig = {
    mode: 'development',
    devtool: 'source-map',

    output: {
        filename: 'scripts/[name].bundle.js',
        chunkFilename: 'scripts/[name].bundle.js'
    },

    plugins: [
         new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(process.env.ENV),
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'API_HOST':JSON.stringify('192.168.11.230')
            }
        })
    ],
    stats:{
        assets: true,
        assetsSort: "field",
        cached: true,
        colors: true,
        chunks: true,
        chunkModules: true,
        errors:true,
        errorDetails:true,
        modules: true,
        timings: true,
    }

};


module.exports = merge( baseConfig,devConfig);
