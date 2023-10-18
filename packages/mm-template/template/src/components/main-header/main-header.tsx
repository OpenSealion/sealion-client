import React, { useEffect, useState, useContext } from 'react';
import { Button, Switch } from 'antd';
import { fetchUserInfo } from '@services/user';
import { ChangeLanguageContext } from '@components/global-lang/global-lang';
import { getLang } from '@utils/utils';
import styles from './main-header.module.less';

const defaultLanguage = getLang();

const MainHeader = () => {
    const changeLanguage = useContext(ChangeLanguageContext);
    const [userInfo, setUserInfo] = useState({
        name: ''
    });

    useEffect(() => {
        const initUserInfo = async () => {
            const resp = await fetchUserInfo('1').catch(err => console.log(err));
            if (resp.code === 0) {
                setUserInfo(resp.data);
            }
        };

        initUserInfo();
    }, []);

    const changeLocale = (checked: boolean) => {
        console.log(checked);
        const lang = checked ? 'zh-CN' : 'en-US';
        changeLanguage(lang);
    }

    return (
        <header className={styles.mainHeader}>
            <span className={styles.name}>{userInfo.name}</span>
            <Switch
                className={styles.localeSwitch}
                checkedChildren="中文"
                unCheckedChildren="英文"
                defaultChecked={defaultLanguage === 'zh-CN'}
                onChange={changeLocale}
            />
            <Button type="primary">logout</Button>
        </header>
    );
};

export default MainHeader;
