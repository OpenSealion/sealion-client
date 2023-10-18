const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { resolvePath } = require('./utils/index');
const pkgJSON = require('../package.json');

module.exports = {
    entry: resolvePath('../src/index.tsx'),
    output: {
        filename: '[name].[contenthash:8].js',
        path: resolvePath('../dist'),
        publicPath: '/',
        clean: true,
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            //  cache.buildDependencies.config: [__filename] 来获取最新配置以及所有依赖项
            config: [__filename]
        }
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all', // 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial
            minSize: 20000, // 生成 chunk 的最小体积
            maxAsyncRequests: 6, // 按需加载时的最大并行请求数
            maxInitialRequests: 6, // 入口点的最大并行请求数
            cacheGroups: {
                vendor: {
                    name: 'chunk-vendors',
                    minChunks: 2, // 拆分前必须共享模块的最小 chunks 数
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },
                antdUI: {
                    name: 'antd',
                    test: /[\\/]node_modules[\\/]_?antd(.*)/,
                    priority: 15,
                    reuseExistingChunk: true
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        alias: {
            '@': resolvePath('../src'),
            '@components': resolvePath('../src/components'),
            '@layouts': resolvePath('../src/layouts'),
            '@asserts': resolvePath('../src/asserts'),
            '@pages': resolvePath('../src/pages'),
            '@services': resolvePath('../src/services'),
            '@utils': resolvePath('../src/utils'),
            '@styles': resolvePath('../src/styles'),
            '@routes': resolvePath('../src/routes'),
            '@config': resolvePath('../src/config'),
            '@locales': resolvePath('../src/locales'),
            '@constants': resolvePath('../src/constants'),
            '@interceptors': resolvePath('../src/interceptors'),
            '@hooks': resolvePath('../src/hooks')
        },
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                [
                                    '@babel/preset-env', // 预制配置
                                    {
                                        corejs: {
                                            version: 3,
                                        },
                                        useBuiltIns: 'usage', // 按需引入 pollyfill
                                    },
                                ],
                                '@babel/preset-react', // React 环境
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                [
                                    'import',
                                    {
                                        libraryName: 'antd',
                                        // libraryDirectory: 'es',
                                        // style: 'css',
                                        style: true
                                    },
                                    'antd'
                                ],
                            ],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    },
                },
                generator: {
                    filename: 'assets/imgs/[name].[contenthash:8][ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: resolvePath('../public/index.html'),
            title: pkgJSON.name,
            minify: 'auto'
        }),
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
        })
    ]
};
