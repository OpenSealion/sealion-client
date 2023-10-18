import React from 'react';
import { useIntl } from 'react-intl';

const Hello = () => {
    const Intl = useIntl();

    return (
        <div>
            {
                Intl.formatMessage({
                    id: 'hello',
                    defaultMessage: '嗨'
                })
            }
        </div>
    );
};

export default Hello;
