import React, { useState } from 'react';

const mainContext = React.createContext([]);

export const MainProvider = ({ children }) => {
    const [matchupResults, setMatchResults] = useState([]);
    const [players, setPlayers] = useState([]);
    const [getID, setGetID] = useState('');

    return (
        <mainContext.Provider
            value={{ matchupResults, setMatchResults, players, setPlayers, getID, setGetID }}
        >
            {children}
        </mainContext.Provider>
    );
};

export default mainContext;
