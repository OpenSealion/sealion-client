import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './left-aside.module.less';

const LeftAside = () => {
    return (
        <nav className={styles.leftAside}>
            <p>
                <NavLink
                    to="/main/great"
                    className={({ isActive }) => classNames(isActive && styles.active)}
                >
                    great
                </NavLink>
            </p>
            <p>
                <NavLink
                    to="/main/hello"
                    className={({ isActive }) => classNames(isActive && styles.active)}
                >
                    hello
                </NavLink>
            </p>
            <p>
                <NavLink
                    to="/main/hi"
                    className={({ isActive }) => classNames(isActive && styles.active)}
                >
                    hi
                </NavLink>
            </p>
        </nav>
    );
};

export default LeftAside;
