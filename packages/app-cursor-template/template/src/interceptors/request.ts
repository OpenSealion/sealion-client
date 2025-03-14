import { getLang } from '@utils/utils';
import { AxiosRequestHeaders } from 'axios';

// *Interceptor函数：主要用来在请求发出前处理config，config由axios的请求拦截器提供
// *Interceptor函数运行规则：函数会依次从左到右执行，每个*Interceptor函数必须返回config，供下一个*Interceptor函数处理
// 好处：代码结构更清晰，每个函数专注做自己的事情，拿到config处理后return，达到逻辑解耦的目的

interface IAuth extends AxiosRequestHeaders {
    Authorization?: string;
}

// 简化的请求拦截器
const customConfigInterceptor = (config) => {
    const headers: IAuth = {
        lang: getLang(),
        ...config.headers,
    };

    return {
        ...config,
        headers: {
            ...headers,
            'Client-Type': 'app',
            type: 0,
        },
    };
};

export const requestInterceptors = [customConfigInterceptor];
