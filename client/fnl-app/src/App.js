import './App.css';
import MatchUp from './Components/Views/MatchUp';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Views/Home';
import Navbar from './Components/Organisms/Navbar/Navbar';
import MatchResults from './Components/Views/MatchResults';
import PlayerStatus from './Components/Views/PlayerStatus';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MainProvider } from './Context';
import AddPlayer from './Components/Views/AddPlayer';
import Players from './Components/Views/Players';
import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <MainProvider>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route
                    path='/PlayerStatus'
                    element={
                        <ProtectedRoute>
                            <PlayerStatus />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/Matchup/:id'
                    element={
                        <ProtectedRoute>
                            <MatchUp />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/MatchResults'
                    element={
                        <ProtectedRoute>
                            <MatchResults />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/Players'
                    element={
                        <ProtectedRoute>
                            <Players />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/AddPlayer'
                    element={
                        <ProtectedRoute>
                            <AddPlayer />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </MainProvider>
    );
}

export default App;
