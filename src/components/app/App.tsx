import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';

const SinglecomicPage = lazy(() => import ('../../pages/SinglecomicPage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const Page404 = lazy(() => import('../../pages/404'));

const App = (): JSX.Element => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:id' element={<SinglecomicPage/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App