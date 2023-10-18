import { createContext } from 'react';

export interface IUserInfo {
    active?: number;
    avatar?: string;
    contribution?: null;
    email?: string;
    githubAccount?: null;
    lastLoginAt?: string;
    phone?: string;
    userId: string;
    username?: string;
    nickname?: string;
    access?: string;
    bio?: string;
    birth?: string;
    location?: string;
    locationEn?: string;
    organization?: string;
    qq?: string;
    twitter?: string;
    website?: string;
    wechat?: string;
    zhihu?: string;
    ssoUid?: string;
    token?: string;
    roleIds?: string[];
}

export interface IAuth {
    userInfo: IUserInfo;
    isLoading: boolean;
    clearUserInfo: () => void;
}

export const initAuth = {
    userInfo: {
        avatar: '',
        username: '',
        userId: '',
        email: '',
        nickname: '',
        ssoUid: ''
    },
    isLoading: true,
    clearUserInfo: () => {
        console.log('【clearUserInfo】删除用户信息函数初始化失败');
    }
};

export const AuthContext = createContext<IAuth>(initAuth);
