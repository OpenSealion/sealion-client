import { useIntl } from 'react-intl';

export const compose = (...args) => {
    const fns = args.map(arg => {
        return typeof arg === 'function' ? arg : () => arg;
    });

    return (...innerArgs) => {
        let index = 0;
        let result;
        result = fns.length === 0 ? innerArgs : fns[index++](...innerArgs);

        while (index < fns.length) {
            result = fns[index++](result);
        }

        return result;
    };
};

export type Language = 'zh-CN' | 'en-US';
export const LanguageKey = '__Language_locale__';

const loadLang = () => {
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
