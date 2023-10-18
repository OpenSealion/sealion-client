// 配置代理，请参考webpack文档
// https://webpack.docschina.org/configuration/dev-server/#devserverproxy
module.exports = {
    '/mock': {
        target: 'http://localhost:3000',
        pathRewrite: {
            '^/mock': ''
        },
        secure: false
    }
};
