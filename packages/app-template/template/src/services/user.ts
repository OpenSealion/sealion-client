import { request } from '@utils/ajax';
// example
// 获取用户信息
export const fetchUserInfo = (userId: string) => {
    return request(
        'userinfo',
        {
            params: {
                id: userId
            },
        },
        'mock'
    );
};

export const fetchExample = (exampleId: string) => {
    return request(
        'userinfo',
        {
            method: 'post',
            data: {
                id: exampleId
            },
            meta: {
                isIgnoreError: true // 接口报错时全局弹窗不提示

            }
        },
        'mock'
    );
};
