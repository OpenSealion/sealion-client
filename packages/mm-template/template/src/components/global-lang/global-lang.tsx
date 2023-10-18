import React, { useCallback, useState } from 'react';
import { IntlProvider } from 'react-intl';
import {
    getLang, Language, setLang
} from '@utils/utils';
import locales from '@/locales';

export const ChangeLanguageContext = React.createContext((lang: Language) => {
    console.log(lang);
});

const GlobalLang = ({ children }) => {
    const [currLanguage, setCurrLanguage] = useState(getLang());

    const setGlobalLang = useCallback((lang: Language) => {
        setCurrLanguage(lang);
        setLang(lang);
    }, []);

    return (
        <IntlProvider locale={currLanguage} messages={locales[currLanguage]}>
            <ChangeLanguageContext.Provider value={setGlobalLang}>
                { children }
            </ChangeLanguageContext.Provider>
        </IntlProvider>
    );
}

export default GlobalLang;
