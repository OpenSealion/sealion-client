import { GlobalLang } from '@components/global-lang';
import ErrorBoundaryMessage from '@components/error-boundary-message';
import ErrorBoundary from '@components/error-boundary';
import Auth from '@components/auth/auth';
import RouterRoot from './routes';
import './styles/index.less';
import 'sea-lion-ui/dist/index.css';

console.log(import.meta.env.VITE_NODE);

const App = () => {
    return (
        <ErrorBoundary>
            <GlobalLang>
                <Auth>
                    <RouterRoot />
                </Auth>
            </GlobalLang>
        </ErrorBoundary>
    );
};

export default App;
