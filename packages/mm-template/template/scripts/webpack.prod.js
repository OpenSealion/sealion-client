/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const { getStyleLoaders } = require('./utils');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                oneOf: [...getStyleLoaders('production')]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[contenthash:8].css',
        })
    ]
});
