import { FC, ReactNode } from 'react';
import { AuthContext, initAuth } from './auth-context';

export interface AuthProps {
    children: ReactNode;
}

// 简化的身份验证组件，不进行任何验证
const NoAuth: FC<AuthProps> = ({ children }) => {
    return (
        <AuthContext.Provider value={initAuth}>
            {children}
        </AuthContext.Provider>
    );
};

export default NoAuth;
