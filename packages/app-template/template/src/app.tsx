import RouterRoot from '@routes/root';
import GlobalLang from '@components/global-lang/global-lang';

const App = () => {
    return (
        <GlobalLang>
            <div className="app">
                <RouterRoot />
            </div>
        </GlobalLang>
    );
};

console.log(process.env.NODE_ENV);

export default App;
