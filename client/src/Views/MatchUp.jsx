import React, { useContext,  useState } from 'react';

const MatchUp = () => {
  
    const [teams, setTeams] = useState({
        game: {
            teamWhite: {
                Team: 'White',
                players: [{}],
                goalie: '',
            },
            teamBlack: {
                Team: 'Black',
                players: [{}],
                goalie: '',
            },
        },
    });
   

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
        </>
    );
};

export default MatchUp;
