// router component
import {
    BrowserRouter, Routes, Route, Navigate
} from 'react-router-dom';
import HeaderContainerLayout from '@layouts/header-container-layout/header-container-layout';
import Home from '@pages/home/home';
import DemoPage from '@pages/demo-page/demo-page';
import { VITE_NODE } from '@config/index';

const RouterRoot = () => {
    return (
        // react-router-dom v6 123
        // https://reactrouter.com/docs/en/v6/getting-started/overview
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HeaderContainerLayout />}>
                    <Route
                        index
                        element={<Navigate to="home" replace />}
                    />
                    <Route path="home" element={<Home />} />

                    {
                        VITE_NODE === 'development'
                            && (
                                <Route path="demo" element={<DemoPage />} />
                            )
                    }
                </Route>
                <Route
                    path="*"
                    element={(
                        <main>
                            <p>There is nothing here!</p>
                        </main>
                    )}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterRoot;
