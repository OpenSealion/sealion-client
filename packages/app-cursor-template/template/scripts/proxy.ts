// https://github.com/http-party/node-http-proxy#options
const ProxyConfig = {
    '/mock': {
        target: 'http://localhost:3000',
        rewrite: path => {
            console.log(path);
            return path.replace(/^\/mock/, '');
        },
        secure: false // 开启https
    },
    '/api/v1': {
        target: 'http://staging.opengvlab.shlab.org.cn',
        changeOrigin: true,
    },
};

export default ProxyConfig;
