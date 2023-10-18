import { message } from 'antd';

export const handleUnauth = () => {
    // 处理一些用户权限验证
};

const formatResponseData = response => {
    return response.data;
};

const handleErrorAlert = response => {
    const resp = response.data;
    const meta = response.__meta;
    const notIgnoreError = !meta.isIgnoreError;
    if (resp.success === false && notIgnoreError) {
        message.error(resp.msg);
    }
    return response;
};

const validateAuth = response => {
    handleUnauth();
    return response;
};

const handleErrorData = (error) => {
    // 如果没有用户则不显示弹窗
    if (error.response) {
        const code = error.response.status;
        console.log(error.response.data, 'error.....');
        switch (code) {
        case 401:
            handleUnauth();
            break;
        case 500:
            message.error('Service error');
            break;
        default:
            message.error('Service error');
        }
    }
    // 可能是取消接口请求
    return Promise.reject(error);
};

export const responsetInterceptors = [validateAuth, handleErrorAlert, formatResponseData];

export const responsetErrorInterceptors = [handleErrorData];
