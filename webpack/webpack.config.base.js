'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const env = process.env.NODE_ENV;
const isDevMode = env == 'development';
const distPath = path.join(__dirname, "../dist/app-monitor-static");

function getBaseConfiguration(options) {
    return {
        resolve: {
            modules: [
                path.join(__dirname, "../src"),
                path.join(__dirname, "../node_modules")
            ]
        },
        entry: {
            'app': 'app.js'
        },
        output: {
            path: distPath,
            publicPath: '/app-monitor-static/'
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all"
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, '..', 'src/index.html')
            }),
            new cleanWebpackPlugin([
                'scripts'
            ], {
                root: distPath,
                verbose: true
            })
        ],
        externals: {
            jquery: "jQuery"
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: [/node_modules/],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            sourceMap: true,
                            //presets: ["es2015","stage-2", "react" ],
                            plugins: [
                                "add-module-exports", 
                                ['import', [{ libraryName: "antd", style: 'css' }]],
                                'syntax-dynamic-import'
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/,
                    use: ["file-loader?name=[name].[ext]"]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader']
                },
                {
                    test: /\.(scss|sass)$/,
                    use: ['style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                camelCase: 'dashesOnly',
                                importLoaders: 2,
                                sourceMap: isDevMode
                            }
                        },
                        'postcss-loader', 'sass-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    use: ['eslint-loader'],
                    exclude: [/node_modules/]
                }
            ]
        }

    };
}

module.exports = getBaseConfiguration;