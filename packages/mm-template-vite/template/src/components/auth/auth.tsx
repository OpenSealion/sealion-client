import {
    FC, useEffect, useState, ReactNode
} from 'react';
import JSCookie from 'js-cookie';
import Mlog from '@utils/mlog';
import {
    formatQuery,
    Token,
    jumpLogin,
    isNeedAuth,
    UserInfo
} from '@utils/utils';
import { fetchOauthCode } from '@services/user';
import { openOSS } from '@config/auth';
import { AuthContext, initAuth, IAuth } from './auth-context';
import { AuthPages } from '@/config/auth';

const getToken = async (code: string) => {
    if (Token.get()) return Token.get();
    // 这个请求会让后端把token放到cookie上
    const resp = await fetchOauthCode(code, window.location.href);
    const tokenFromCookie = JSCookie.get('token');

    return resp.token || tokenFromCookie;
};

export interface AuthProps {
    children: ReactNode,
}

const { oauthCode, realPath } = formatQuery((window as any).routerBase);

const Auth: FC<AuthProps> = ({ children }) => {
    const [authInfo, setAuthInfo] = useState<IAuth>(initAuth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initToken = async (code: string) => {
            setLoading(true);
            // 如果反复跳转，需要找相关接口确认，是否在response 中返回token
            const token = await getToken(code);
            return token;
        };

        const setUserInfo = async t => {
            const userInfo = await UserInfo.get(t);
            setAuthInfo({
                isLoading: false,
                userInfo: {
                    token: t,
                    avatar: userInfo.avatar,
                    email: userInfo.email,
                    username: userInfo.username,
                    userId: userInfo.ssoUid,
                    roleIds: userInfo.roleIds,
                    ssoUid: userInfo.ssoUid,
                    nickname: userInfo.nickname,
                    githubAccount: userInfo.githubAccount
                },
                clearUserInfo: () => {
                    setAuthInfo(initAuth);
                }
            });
            Mlog.configUserId(userInfo.ssoUid);
        };

        const init = async () => {
            // code变化并且code存在就走完整流程，code -> token -> userInfo
            if (oauthCode) {
                const token = await initToken(oauthCode);
                Token.storage(token);
                await setUserInfo(token);
                window.history.replaceState(null, null, realPath);
                setLoading(false);
            } else if (Token.get()) {
                await setUserInfo(Token.get());
                setLoading(false);
            } else if (isNeedAuth(AuthPages)) {
                window.location.href = jumpLogin();
            }
        };

        init();
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

const NoAuth: FC<AuthProps> = ({ children }) => {
    return (
        <AuthContext.Provider value={initAuth}>
            {children}
        </AuthContext.Provider>
    );
};

export default openOSS ? Auth : NoAuth;
