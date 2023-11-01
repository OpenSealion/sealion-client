import { useCallback, ReactNode } from 'react';

export const fetchMetaData = async (url: string) => {
    let data = {};
    const resp = await fetch(url);
    data = await resp.json();

    return data;
};

export const isURL = (url: any): boolean => {
    try {
        // eslint-disable-next-line no-new
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export const isLinkNode = (node) => {
    return Array.isArray(node) && node.length > 0 && isURL(node[1]);
};

export const addRandomQuery = (url: string): string => {
    if (!isURL(url)) {
        console.warn(`[addRandomQuery] ${url} is not url`);
        return window.location.href;
    }

    const urlObj = new URL(url);

    urlObj.searchParams.set('__nocache__', Date.now().toString());
    return urlObj.toString();
};

export interface TextObj {
    'en-US': string;
    'zh-CN': string;
}

export type TextType = string | TextObj

export const gTextByLang = (text: TextType, lang) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text['en-US'] && text['zh-CN']) return text[lang];
    console.warn(`[gText] ${text} is not url`);
    return (text ?? '').toString();
};

export const useText = (lang: string) => {
    const gText = useCallback((text: TextType | undefined) => gTextByLang(text, lang), [lang]);
    return gText;
};

export interface Obj {
    [key: string]: any
}

export const getDataByKeyFromList = (list: Array<Obj>, value: any, key: string): any => {
    const data = list.find(item => item[key] === value);

    return data;
};

export const getDataByModelName = (value: string, dataSource: Array<any>): any => {
    return getDataByKeyFromList(dataSource, value, 'model');
};
