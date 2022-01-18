import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import ErrorMassage from '../errorMassage/ErrorMassage'
import ComicsPage from '../../pages/ComicsPage'
import HomePage from '../../pages/HomePage'


const App = (): JSX.Element => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path='*' element={<ErrorMassage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;