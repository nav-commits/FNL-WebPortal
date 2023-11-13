import './App.css';
import MatchUp from './Views/MatchUp';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Navbar from './Organisms/Navbar/Navbar';
import MatchResults from './Views/MatchResults';
import Players from './Views/Players';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MainProvider } from './Context';
import AddPlayer from './Views/AddPlayer';
import PlayerStatus from './Views/PlayerStatus';

function App() {
    return (
        <MainProvider>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/PlayerStatus' element={<PlayerStatus />} />
                <Route path='/Matchup/:id' element={<MatchUp />} />
                <Route path='/MatchResults' element={<MatchResults />} />
                <Route path='/Players' element={<Players />} />
                <Route path='/AddPlayer' element={<AddPlayer />} />
            </Routes>
        </MainProvider>
    );
}

export default App;
