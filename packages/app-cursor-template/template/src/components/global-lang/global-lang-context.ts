import { createContext } from 'react';
import { Language } from '@utils/utils';

const noop = (l: Language) => {
    console.log(l);
};

export const LangDefault = {
    locale: '',
    setLocale: noop,
};

export const GlobalLangeContext = createContext<typeof LangDefault>(LangDefault);
