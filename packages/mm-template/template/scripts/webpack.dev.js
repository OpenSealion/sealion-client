/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const proxyConfig = require('./dev.proxy');
const { getStyleLoaders } = require('./utils');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hot: true,
        open: true,
        compress: false,
        https: false,
        port: 8899,
        client: {
            progress: true,
        },
        allowedHosts: 'all',
        proxy: proxyConfig,
        historyApiFallback: true, // 支持 history 路由重定向到 index.html 文件
    },
    module: {
        rules: [
            {
                oneOf: [...getStyleLoaders('development')]
            }
        ]
    },
    stats: 'errors-only' // 编译只输出错误日志
});
