import './App.css';
import Game from './Views/Game';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';

function App() {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/Game' element={<Game />} />
            </Routes>
        </>
    );
}

export default App;
