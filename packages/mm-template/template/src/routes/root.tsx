import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/main-layout/main-layout';
import Great from '@components/greater/greater';
import Hello from '@pages/hello/hello';
import Hi from '@pages/hi/hi';
import Welcome from '@pages/welcome/welcome';

const RouterRoot = () => {
    return (
        // react-router-dom v6 123
        // https://reactrouter.com/docs/en/v6/getting-started/overview
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Welcome />} />
                    <Route path="main" element={<MainLayout />}>
                        <Route index element={<Great />} />
                        <Route path="great" element={<Great />} />
                        <Route path="hello" element={<Hello />} />
                        <Route path="hi" element={<Hi />} />
                    </Route>
                    <Route
                        path="*"
                        element={(
                            <main>
                                <p>There is nothing here!</p>
                            </main>
                        )}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouterRoot;
