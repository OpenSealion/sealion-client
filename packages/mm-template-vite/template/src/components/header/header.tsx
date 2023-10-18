import { useEffect, useContext } from 'react';
import { Space, IconFont } from 'sea-lion-ui';
import { AuthContext } from '@components/auth/auth-context';
import styles from './header.module.less';

const Header = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <div className={styles.menus}>SeaLion</div>
            <div className={styles.funcs}>
                <Space>
                    <IconFont
                        fontSize="30px"
                        icon="icon-UserOutlined"
                    />
                    <span className={styles.username}>{ userInfo.username || 'Need open auth' }</span>
                </Space>
            </div>
        </header>
    );
};

export default Header;
