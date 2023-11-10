import './App.css';
import MatchUp from './Views/MatchUp';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Navbar from './Organisms/Navbar/Navbar';
import MatchResults from './Views/MatchResults';
import Players from './Views/Players';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FormDataProvider } from './Context';
import AddPlayer from './Views/AddPlayer';
import PlayerStatus from './Views/PlayerStatus';

function App() {
    return (
        <FormDataProvider>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/PlayerStatus' element={<PlayerStatus />} />
                <Route path='/Matchup/:id' element={<MatchUp />} />
                <Route path='/Results' element={<MatchResults />} />
                <Route path='/Players' element={<Players />} />
                <Route path='/AddPlayer' element={<AddPlayer />} />
            </Routes>
        </FormDataProvider>
    );
}

export default App;
