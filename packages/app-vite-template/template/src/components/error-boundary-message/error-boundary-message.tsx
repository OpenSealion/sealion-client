import { FC, ReactNode } from 'react';
import styles from './error-boundary-message.module.less';

export interface ErrorBoundaryMessageProps {
    error: Error;
}

const ErrorBoundaryMessage: FC<ErrorBoundaryMessageProps> = ({
    error
}) => {
    return (
        <div className={styles.errorBoundaryMessage}>
            {
                error && error.message
                    ? error.message
                    : 'Some error happened!'
            }
        </div>
    );
};

export default ErrorBoundaryMessage;
