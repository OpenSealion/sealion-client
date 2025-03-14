import { request } from '@utils/ajax';

const userServicePrefix = '/gw/user-service';
const uaaServicePrefix = '/gw/uaa-be';

export interface fetchCurrentUserReqDto {
    avatar?: string;
    email?: string;
    expiration?: string;
    roleIds?: string[];
    nickname?: string;
    jwt?: string;
    ssoUid: string;
    username?: string;
    wechat?: string;
    wechatName?: string;
    [key: string]: any;
}

// 模拟的用户信息获取函数
export async function fetchCurrentUser() {
    // 返回一个模拟的用户信息
    return {
        avatar: '',
        email: 'demo@example.com',
        roleIds: [],
        ssoUid: 'demo-user',
        username: 'Demo User',
    };
}

export async function logout() {
    // 模拟登出成功
    return { success: true };
}

export interface fetchOauthCodeReqDto {
    token: string;
}

// 模拟的OAuth验证函数
export const fetchOauthCode = () => {
    return Promise.resolve({ token: 'mock-token' });
};
