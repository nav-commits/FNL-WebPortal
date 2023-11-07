import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MatchUp = () => {
    const [statusOfPLayers, setStatusOfPLayers] = useState([]);
    // const [teams, setTeams] = useState({
    //     game: {
    //         teamWhite: {
    //             Team: 'White',
    //             players: [],
    //             goalie: '',
    //         },
    //         teamBlack: {
    //             Team: 'Black',
    //             players: [],
    //             goalie: '',
    //         },
    //     },
    // });

    const { id } = useParams();
    useEffect(() => {
        // Use the ID to fetch the data
        fetch(`/playerStatus/status/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('Success:', data);
                // Use the data to update your state variables
                setStatusOfPLayers(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const validKeys = ['monthToMonth', 'weekToWeek', 'IR', 'fiftyFifty'];

    const getKey = (key, validKeys) => {
        if (validKeys.includes(key)) {
            return key;
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
            <h1 style={{ textAlign: 'center' }}>Players Status</h1>
            <h3 style={{ textAlign: 'center' }}>Make Teams</h3>

            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '50px',
                        justifyContent: 'center',
                    }}
                >
                    {Object.keys(statusOfPLayers).map((key) => {
                        if (getKey(key, validKeys)) {
                            return (
                                <div key={key}>
                                    <h1>{key}</h1>
                                    {statusOfPLayers[key].players.map(
                                        (singlePlayer, playerIndex) => {
                                            return (
                                                <div key={playerIndex}>
                                                    <p>
                                                        {' '}
                                                        {playerIndex + 1} {singlePlayer.name}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </>
    );
};

export default MatchUp;
