import React from 'react';
import imgUrl from '@asserts/imgs/low-salary.jpg';
import styles from './greater.module.less';
// 测试通过css和img导入图片
const Geater = () => {
    return (
        <div className={styles.greater}>
            <img src={imgUrl} width="200" />
        </div>
    );
};

export default Geater;
