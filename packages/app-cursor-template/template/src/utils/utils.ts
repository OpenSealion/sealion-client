import { useIntl } from 'react-intl';
import qs from 'query-string';

export type Language = 'zh-CN' | 'en-US';
export const LanguageKey = 'locale';

export const loadLang = () => {
    const storeLang = window.localStorage.getItem(LanguageKey);
    if (storeLang) {
        return storeLang === 'en-US' ? 'en-US' : 'zh-CN';
    }
    // default lang: English
    localStorage.setItem(LanguageKey, 'en-US');
    return 'en-US';
};

let currentLang: Language = loadLang();
const saveLang = (lang: Language) => {
    window.localStorage.setItem(LanguageKey, lang);
    return lang;
};

export const getLang = () => currentLang;
export const setLang = (lang: Language) => {
    currentLang = saveLang(lang);
};

export const Intl = (id: string) => {
    return useIntl().formatMessage({ id });
};

// 简化的Token工具，只提供基本功能接口
export const Token = {
    tokenKey: 'x_token',
    get() {
        return null;
    },
    has() {
        return false;
    },
    removeAll() {
        // 不执行任何操作
    },
};

// 简化的UserInfo工具，只提供基本功能接口
export const UserInfo = {
    key: '_$_userinfo_key_$_',
    async get() {
        return null;
    },
    del() {
        // 不执行任何操作
    },
};

// 格式化查询参数的工具函数
export const formatQuery = (basename = '') => {
    const { search, pathname } = window.location;
    const url: string = pathname + search;
    let realPath = '';
    const query = qs.parse(search) || {};
    const lang = query.lang || '';
    
    if (url.startsWith(basename)) {
        realPath = url.slice(basename?.length);
        realPath = realPath.startsWith('/') ? realPath : `/${realPath}`;
    }

    // 保留lang处理
    realPath = realPath.replace(`?lang=${lang}&`, '?');
    realPath = realPath.replace(`?lang=${lang}`, '');
    realPath = realPath.replace(`&lang=${lang}`, '');

    return {
        realPath,
        oauthCode: '',
        lang,
    };
};

// Function which concat all functions together
export const callFnsInSequence = (...fns: any[]) => (...args: any) => fns.forEach((fn) => fn && fn(...args));

export const jumpLogin = () => {
    return '/';
};

export const isNeedAuth = () => {
    return false;
};
