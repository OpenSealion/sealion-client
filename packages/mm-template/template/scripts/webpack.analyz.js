/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prod = require('./webpack.prod');

module.exports = merge(prod, {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
});
