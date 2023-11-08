import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MatchUp = () => {
    const [statusOfPLayers, setStatusOfPLayers] = useState({});
    const [teams, setTeams] = useState({
        teamWhite: {
            Team: 'White',
            players: [],
            goalie: '',
        },
        teamBlack: {
            Team: 'Black',
            players: [],
            goalie: '',
        },
    });

    const { id } = useParams();
    useEffect(() => {
        // Use the ID to fetch the data
        fetch(`/playerStatus/status/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('Success:', data);
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

    const handleDragStart = (e, player) => {
        e.dataTransfer.setData('playerId', player.id);
        console.log(player.id);
    };
    const handleDrop = (e, teamKey, key) => {
        e.preventDefault();
        const playerId = e.dataTransfer.getData('playerId');
        const playerStatus = statusOfPLayers[key];
        const player = playerStatus ? playerStatus.players.find(p => p.id === +playerId) : null;
        if (player) {
            setTeams(prevTeams => {
                const newTeam = { ...prevTeams[teamKey] };
                newTeam.players.push(player);
                return { ...prevTeams, [teamKey]: newTeam };
            });
        } 
    };

    console.log(teams)

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
            <h1 style={{ textAlign: 'center' }}>Players Status</h1>
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
                                <div
                                    style={{
                                        borderRadius: '10px',
                                        margin: '10px',
                                        padding: '20px',
                                        width: '250px',
                                    }}
                                    key={key}
                                >
                                    <h1>{key}</h1>
                                    {statusOfPLayers[key].players.map(
                                        (singlePlayer, playerIndex) => {
                                            return (
                                                <div key={playerIndex}>
                                                    <p
                                                        onDragStart={(e) =>
                                                            handleDragStart(e, singlePlayer)
                                                        }
                                                        draggable
                                                    >
                                                        {' '}
                                                        {playerIndex + 1}. {singlePlayer.name}
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
                <h3 style={{ textAlign: 'center', marginTop: '30px' }}>Make Teams</h3>

                <div
                    style={{
                        border: '1px solid #000',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        margin: '10px',
                        padding: '20px',
                        width: '250px',
                    }}
                    onDrop={(e) => handleDrop(e, 'teamWhite', 'IR')}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <h2>{teams.teamWhite.Team}</h2>
                    <p>goalie: {teams.teamWhite.goalie}</p>
                    <ol>
                        {teams.teamWhite.players.map((player) => (
                            <li>{player.name}</li>
                        ))}
                    </ol>
                </div>

                <div
                    style={{
                        border: '1px solid #000',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        margin: '10px',
                        padding: '20px',
                        width: '250px',
                    }}
                    onDrop={(e) => handleDrop(e, 'teamBlack')}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <h2>{teams.teamBlack.Team}</h2>
                    <p>goalie:{teams.teamBlack.goalie}</p>
                    <ol>
                        {teams.teamBlack.players.map((player) => (
                            <li>{player.name}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
};

export default MatchUp;
