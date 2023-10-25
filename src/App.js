import './App.css';
import Game from './Views/Game';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Navbar from './Organisms/Navbar/Navbar';
import Results from './Views/Results';
import Players from './Views/Players';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/Game' element={<Game />} />
                <Route path='/Results' element={<Results />} />
                <Route path='/Players' element={<Players />} />
            </Routes>
        </>
    );
}

export default App;
