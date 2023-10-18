/**
 * 新开发者可以在此页面熟悉如何使用国际化，引入css和图片等基本操作。
 * 本页面在生产环境不会展示
 */

import { FC, useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
    Button, Icon, Tooltip, isMobile
} from 'sea-lion-ui';
import { GlobalLangeContext } from '@components/global-lang';
import { getLang } from '@utils/utils';
import { fetchEvaluateList } from '@services/home';

import imgUrl from '@assets/imgs/low-salary.jpg';
import styles from './demo-page.module.less';

const DemoPage: FC = () => {
    const Intl = useIntl();
    const { setLocale } = useContext(GlobalLangeContext);

    const handleChangeLocale = () => {
        const lang = getLang() === 'en-US' ? 'zh-CN' : 'en-US';
        console.log(getLang(), lang);
        setLocale(lang);
    };

    const handleClick = () => {
        console.log(`   
            ${isMobile}
            avail: ${ window.screen.availWidth} * ${ window.screen.availHeight};
            screen: ${ window.screen.width} * ${ window.screen.height};
            window: ${window.innerWidth} * ${window.innerHeight};
            dpr: ${window.devicePixelRatio};
        `);
    };

    useEffect(() => {
        const f = async () => {
            const resp = await fetchEvaluateList();
            console.log(resp);
        };
        f();
    }, []);

    return (
        <div className={styles.demoPage}>
            <div className={styles.welcome}>
                {
                    Intl.formatMessage({ id: 'welcome', defaultMessage: 'default welcome' })
                }
                <img src={imgUrl} alt="big v" width={200} />
            </div>
            <div className={styles.remSection}>
                <span>随着rem改变大小</span>
            </div>
            <div>
                <Tooltip title="国际化按钮">
                    <Button btnType="text" onClick={handleChangeLocale}>
                        <Icon icon="icon-AttentionOutlined" />
                        change language
                    </Button>
                </Tooltip>
                <Tooltip title="弹出屏幕信息">
                    <Button btnType="text" onClick={handleClick}>
                        alert screen info
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default DemoPage;
