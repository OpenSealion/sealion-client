import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftAside from '@components/left-aside/left-aside';
import MainHeader from '@components/main-header/main-header';
import styles from './main-layout.module.less';
// 仅作为示意

interface IMainLayoutProps {
    header?: React.ReactNode;
    aside?: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({
    children
}) => {
    return (
        <div className={styles.mainLayout}>
            <div className={styles.header}>
                <MainHeader />
            </div>
            <div className={styles.main}>
                <div className={styles.leftAside}>
                    <LeftAside />
                </div>
                <div className={styles.container}>
                    {children || <Outlet />}
                </div>
            </div>

        </div>
    );
};

export default MainLayout;
