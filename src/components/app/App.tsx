import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import SinglecomicPage from '../../pages/SinglecomicPage'
import ComicsPage from '../../pages/ComicsPage'
import AppHeader from "../appHeader/AppHeader";
import HomePage from '../../pages/HomePage'
import Page404 from '../../pages/404'


const App = (): JSX.Element => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path='/comics/:id' element={<SinglecomicPage/>}/>
                        <Route path='*' element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;