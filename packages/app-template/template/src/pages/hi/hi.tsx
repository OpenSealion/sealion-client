import React from 'react';
import { useIntl } from 'react-intl';

const Hi = () => {
    const Intl = useIntl();
    return (
        <div>
            {
                Intl.formatMessage({
                    id: 'hi',
                    defaultMessage: '嗨'
                })
            }
        </div>
    );
};

export default Hi;
