import { message } from 'sea-lion-ui';
import { getLang } from '@utils/utils';
import { AxiosError } from 'axios';
import { detector } from '@easycode/client-detector';
import { Meta } from '@utils/ajax';

// 移除了权限验证相关代码
export const handleUnauth = () => {
    // 已移除权限验证代码
};

const formatResponseData = (response) => {
    const resp = response.data;
    const meta = response.__meta;
    const { isAllResponseBody } = meta; // isAllResponseBody是否需要返回完整数组结构
    if (isAllResponseBody) {
        return resp;
    }
    return resp.data;
};

const handleErrorAlert = (response) => {
    const resp = response.data;
    const meta = response.__meta;
    const notIgnoreError = !meta.isIgnoreError;
    if (resp.success === false && notIgnoreError) {
        message.error(resp.msg);
    }
    return response;
};

const showErrorMessage = (text, ignore = false) => {
    if (!ignore) {
        message.error(text);
    }
};

const sendErrorLog = (response) => {
    try {
        const resp = response.data;
        if (resp && resp.msgCode !== '10000') {
            const err = new Error(JSON.stringify(resp));
            detector.sendError2(err, response.request.responseURL);
        }
    } catch (error) {
        detector.sendError2(error, response.request.responseURL);
    }
    return response;
};

const handleErrorData = (error) => {
    // 简化错误处理
    if (error.response) {
        const meta = error.__meta;
        const ignore = meta.isIgnoreGatewayError;

        const code = error.response.status;
        
        try {
            const err = new Error(JSON.stringify(error.response.data));
            detector.sendError2(err, error.request.responseURL);
        } catch (err) {
            detector.sendError2(err, error.request.responseURL);
        }
        
        switch (code) {
            case 500:
                showErrorMessage(getLang() === 'zh-CN' ? '服务器没有响应，请稍后再试' : 'Sever error, please try again later.', ignore);
                break;
            default:
                if (error.code === 'ERR_NETWORK') {
                    showErrorMessage(getLang() === 'zh-CN' ? '网络出错了，请稍后再试' : 'Network error, please try again later.', ignore);
                } else {
                    showErrorMessage(`${code}: ${error.message || 'unknown error'}`, ignore);
                }
        }
    }
    return Promise.reject(error);
};

// 移除了验证相关拦截器
export const responsetInterceptors = [sendErrorLog, handleErrorAlert, formatResponseData];

type ResponsetErrorInterceptorsError = AxiosError & { __meta: Meta } | Error;

export const responsetErrorInterceptors: [
    ...Array<<T extends ResponsetErrorInterceptorsError>(error: T) => ResponsetErrorInterceptorsError>, (error: ResponsetErrorInterceptorsError) => Promise<AxiosError>
] = [handleErrorData];
