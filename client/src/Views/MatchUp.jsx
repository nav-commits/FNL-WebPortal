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
        e.dataTransfer.setData('player', JSON.stringify(player));
    };

    const handleDrop = (e, teamName) => {
        e.preventDefault();
        const player = JSON.parse(e.dataTransfer.getData('player'));
        // Update the team based on the teamName from the event
        if (player) {
            if (!teams[teamName].players.some((p) => p.username === player.username)) {
                setTeams((prevTeams) => {
                    const newTeams = { ...prevTeams };
                    const newTeam = { ...newTeams[teamName] };
                    if (newTeam.goalie === player.username) {
                        // Player is already a goalie, do nothing
                        return prevTeams;
                    } else if (newTeam.players.some((p) => p.username === player.username)) {
                        // Player is already in the team, do nothing
                        return prevTeams;
                    } else if (newTeam.goalie === '') {
                        // If goalie position is empty, assign player as goalie
                        newTeam.goalie = player.username;
                    } else {
                        // Add player to the team
                        newTeam.players.push(player);
                    }

                    newTeams[teamName] = newTeam;
                    return newTeams;
                });
            } else {
                setTeams((prevTeams) => {
                    const newTeams = { ...prevTeams };
                    const newTeam = { ...newTeams[teamName] };
                    if (newTeam.goalie === player.username) {
                        // Player is already a goalie, remove them
                        newTeam.goalie = '';
                    } else if (newTeam.players.some((p) => p.username === player.username)) {
                        // Player is already in the team, remove them
                        newTeam.players = newTeam.players.filter(
                            (p) => p.username !== player.username
                        );
                    }
                    newTeams[teamName] = newTeam;
                    return newTeams;
                });
            }
        }
    };

    console.log(teams);
    const teamNameKeys = Object.keys(teams);
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
            <h1 style={{ textAlign: 'center'  }}>Players Status</h1>
            <div style={{ backgroundColor: '#f2f2f2'}}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '50px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    {Object.keys(statusOfPLayers)
                        .filter((key) => getKey(key, validKeys))
                        .map((key) => (
                            <div
                                style={{
                                    borderRadius: '10px',
                                    margin: '10px',
                                    padding: '20px',
                                    width: '250px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
                                }}
                                key={key}
                            >
                                <h1 style={{ color: '#4a4a4a' }}>{key}</h1>
                                {statusOfPLayers[key].players.map((singlePlayer, playerIndex) => (
                                    <div key={playerIndex}>
                                        <p
                                            onDragStart={(e) => handleDragStart(e, singlePlayer)}
                                            draggable
                                            style={{
                                                backgroundColor: '#f2f2f2',
                                                borderRadius: '5px',
                                                padding: '10px',
                                                margin: '10px 0',
                                                cursor: 'grab'
                                            }}
                                        >
                                            {playerIndex + 1}. {singlePlayer.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
                <h3 style={{ textAlign: 'center', marginTop: '30px' }}>Make Teams</h3>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundImage:
                            'url("https://media.istockphoto.com/id/1354857034/photo/empty-stands-of-the-ice-arena-and-clean-ice-cut-by-skates.jpg?s=612x612&w=0&k=20&c=V0ua8ZV_MSZyWO7hmyNV-KLAcgiawYSz2bqbtikpPYU=")', // replace with your image URL
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        zIndex: '0',    
                        width: '100%',
                        height: '800px',
                    }}
                >
                    {teamNameKeys.map((teamName) => (
                        <div
                            key={teamName}
                            style={{
                                marginTop: '120px',
                                padding: '20px',
                                zIndex: '1',
                                color: 'white',
                                fontFamily: 'Arial Black, Gadget, sans-serif' ,
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
                            }}
                            onDrop={(e) => handleDrop(e, teamName)}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <h2>Team: {teams[teamName].Team}</h2>
                            <p>Goalie: {teams[teamName].goalie}</p>
                            <p> Players:</p>
                            <ol>
                                {teams[teamName].players.map((player) => (
                                    <li
                                        key={player.name}
                                        draggable='true'
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData(
                                                'player',
                                                JSON.stringify(player)
                                            );
                                        }}
                                    >
                                        {player.name}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MatchUp;
