import React, { useState } from 'react';

const mainContext = React.createContext([]);

export const FormDataProvider = ({ children }) => {
    const [matchupResults, setMatchResults] = useState([]);

    return (
        <mainContext.Provider value={{ matchupResults, setMatchResults }}>
            {children}
        </mainContext.Provider>
    );
};

export default mainContext;
