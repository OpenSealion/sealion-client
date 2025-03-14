// 登录相关配置信息

export const { VITE_NODE } = import.meta.env;

// 开启单点登录开关 - 始终关闭
export const openOSS = false;

// 空白名单 - 不再需要验证
export const AuthPages: string[] = [];

// 空白名单 - 所有接口不需要token
export const NoTokenApiPaths: string[] = [];

export const ClientIdMap = {
    development: 'modjkaa3v93xnjop2weq',
    staging: 'g6rlyoqq3kxgzdzoe84q',
    production: 'nvnoqg6maqjaq3ldzrqb',
};

// 登录跳转链接
export const LogURLMap = {
    development: 'https://sso.dev.openxlab.org.cn',
    staging: 'https://sso.staging.openxlab.org.cn',
    production: 'https://sso.openxlab.org.cn',
};

// 注意 Development环境的domain前面必须加 . 因为，本地开发环境和线上开发环境域名不同
// 如果发生反复跳转，请在浏览器中查看后端返回的cookie的domain是否有问题
export const TokenCookieDomainMap = {
    development: '.opencompass.org.cn',
    staging: 'staging.opencompass.org.cn',
    production: 'opencompass.org.cn',
};

export const clientId = ClientIdMap[VITE_NODE];
export const logURL = LogURLMap[VITE_NODE];
export const TokenCookieDomain = TokenCookieDomainMap[VITE_NODE];
