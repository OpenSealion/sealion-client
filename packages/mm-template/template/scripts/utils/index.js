const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolvePath = p => path.resolve(__dirname, '../', p);

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const lessPatterns = [
    resolvePath('../src/styles/theme.less'),
    resolvePath('../src/styles/variables.less')
];

const getStyleLoaders = mode => {
    const cssLoaders = [
        {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
                mode === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [['autoprefixer']]
                        }
                    }
                }
            ]
        },
        {
            test: cssModuleRegex,
            use: [
                mode === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]--[hash:base64:5]',
                            exportLocalsConvention: 'camelCase'
                        }
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [['autoprefixer']]
                        }
                    }
                }
            ]
        },
        {
            test: lessRegex,
            // 自定义主题不能排查node_modules里面的样式
            exclude: lessModuleRegex,
            use: [
                mode === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [['autoprefixer']]
                        }
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                            modifyVars: {
                                'primary-color': '#0D53DE',
                                'link-color': '#0D53DE', // 链接色
                                'success-color': '#00B365', // 成功色
                                'warning-color': '#FF8800', // 警告色
                                'error-color': '#F5483B', // 错误色
                                'font-size-base': '14px', // 主字号
                                'heading-color': '#121316', // 标题色
                                'text-color': 'rgba(0, 0, 0, 0.80)', // 主文本色 #121316
                                'text-color-secondary': 'rgba(0, 0, 0, 0.50)', // 次文本色
                                'text-color-placeholder': 'rgba(0, 0, 0, 0.25)', // 表单占位
                                'disabled-color': 'rgba(0, 0, 0, 0.20)', // 失效色
                                'border-radius-base': '2px', // 组件/浮层圆角
                                'border-radius-big': '4px', // 卡片圆角
                                'border-color-divisionline': '#F4F5F9', // 分割线
                                'border-color-line': '#EBECF0', // 描边
                            },
                        }
                    }
                },
                // 把less变量加入所有less文件
                {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: lessPatterns
                    }
                }
            ],
        },
        {
            test: lessModuleRegex,
            use: [
                mode === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]--[hash:base64:5]',
                            exportLocalsConvention: 'camelCase'
                        }
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [['autoprefixer']]
                        }
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                            exclude: /node_modules/
                        }
                    }
                },
                // 把less变量加入所有less文件
                {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: lessPatterns
                    }
                }
            ],
        }
    ];

    return cssLoaders;
};

module.exports = {
    resolvePath,
    getStyleLoaders
};
