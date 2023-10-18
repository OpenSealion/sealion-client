// 各个环境的接口前缀
export const ApiPrefixMap = {
    mock: '',
    development: '',
    production: ''
};
// 各个环境的接口请求域名
export const ApiBaseUrlMap = {
    development: '/',
    production: '/'
};

export const Env = process.env.NODE_ENV;

export const ApiPrefix = ApiPrefixMap[Env];

export const BaseURL = ApiBaseUrlMap[Env];
