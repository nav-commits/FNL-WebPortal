import './App.css';
import Game from './Views/Game';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Navbar from './Organisms/Navbar/Navbar';
import MatchResults from './Views/MatchResults';
import Players from './Views/Players';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FormDataProvider } from './Context';

function App() {
    return (
        <FormDataProvider>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/Game' element={<Game />} />
                <Route path='/Results' element={<MatchResults />} />
                <Route path='/Players' element={<Players />} />
            </Routes>
        </FormDataProvider>
    );
}

export default App;
