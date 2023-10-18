import axios from 'axios';
import qs from 'qs';
import { BaseURL, ApiPrefix } from '@config/base-url';
import { requestInterceptors } from '@interceptors/request';
import { responsetInterceptors, responsetErrorInterceptors } from '@interceptors/response';
import { compose } from '@utils/utils';

// eslint-disable-next-line no-undef

export const instance = axios.create({
    method: 'get',
    timeout: 10000,
    responseType: 'json',
    paramsSerializer: params => qs.stringify(params, { indices: false })
});

const MetaDataMap = new Map();

const inBuildHandleMetaResponseInterceptors = (response) => {
    let meta = {};
    if (MetaDataMap.has(response.config.url)) {
        meta = MetaDataMap.get(response.config.url);
        MetaDataMap.delete(response.config.url);
    }
    return {
        ...response,
        __meta: meta
    };
};

responsetInterceptors.unshift(inBuildHandleMetaResponseInterceptors);

const handleRequestInterceptors = compose(...requestInterceptors);
const handleResponsetInterceptors = compose(...responsetInterceptors);
const handleResponsetErrorInterceptors = compose(...responsetErrorInterceptors);

instance.interceptors.request.use(
    handleRequestInterceptors,
    err => (Promise.reject(err))
);

instance.interceptors.response.use(handleResponsetInterceptors, handleResponsetErrorInterceptors);

export const ajax = (api, {
    method = 'GET',
    params = {}, // url query参数
    data = {}, // http body 参数
    ...rest
}) => {
    const url = `${BaseURL}${api}`;
    switch (method.toLowerCase()) {
    case 'get':
        return instance.get(url, { params, ...rest });
    case 'delete':
        return instance.delete(url, { params, data, ...rest });
    case 'post':
        return instance.post(url, data, { params, ...rest });
    case 'put':
        return instance.put(url, data, { params, ...rest });
    default:
        return Promise.resolve({
            then: resolve => resolve({
                msgCode: 300,
                msg: 'method error',
                data: {}
            })
        });
    }
};

export const request = (api, options, prefix) => {
    const needPrefix = prefix || ApiPrefix;
    const fullApi = (`${needPrefix}/${api}`).replace(/\/\//g, '/');
    if (options.meta) {
        MetaDataMap.set(fullApi, options.meta);
        delete options.meta;
    }
    return ajax(fullApi, options);
};

export default ajax;
