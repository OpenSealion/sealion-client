import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import styles from './welcome.module.less';

const Welcome = () => {
    const Intl = useIntl();

    return (
        <div className={styles.weclome}>
            <span>weclome!</span>
            <Link to="/main/great">
                {
                    Intl.formatMessage({
                        id: 'welcome',
                        defaultMessage: '欢迎欢迎'
                    })
                }
            </Link>
        </div>
    );
};

export default Welcome;
