import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { init } from '@easycode/client-detector';
import Mlog from '@utils/mlog';
import ErrorBoundary from '@components/error-boundary';
import '@config/change-page-gray';
import App from './app';

Mlog.init();

init('https://openxlab.org.cn/gw/data-bury', {
    serviceName: 'test-project-prod-service',
}, import.meta.env.VITE_NODE === 'production');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
);
