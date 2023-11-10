import React, { useEffect, useState } from 'react';

const mainContext = React.createContext([]);

export const MainProvider = ({ children }) => {
    const [matchupResults, setMatchResults] = useState([]);
    const [players, setPlayers] = useState([]); 

    useEffect(() => {
           fetch('players/players')
               .then((response) => response.json())
               .then((data) => setPlayers(data));
    }, []);
 
    

    return (
        <mainContext.Provider value={{ matchupResults, setMatchResults, players, setPlayers }}>
            {children}
        </mainContext.Provider>
    );
};

export default mainContext;
