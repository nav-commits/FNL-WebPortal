import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../Atoms/Button/Button';

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

    const teamNameKeys = Object.keys(teams);

    const validKeys = ['monthToMonth', 'weekToWeek', 'IR', 'fiftyFifty'];

    const getKey = (key, validKeys) => {
        if (validKeys.includes(key)) {
            return key;
        }
    };

    const handleDragStart = (e, player, status) => {
        e.dataTransfer.setData('player', JSON.stringify(player));
        e.dataTransfer.setData('status', status);
    };

    const removePlayer = (player, status) => {
        if (status && statusOfPLayers[status] && statusOfPLayers[status].players) {
            setStatusOfPLayers((prevStatus) => {
                const updatedPlayers = prevStatus[status].players.filter(
                    (p) => p.username !== player.username
                );
                return {
                    ...prevStatus,
                    [status]: { ...prevStatus[status], players: updatedPlayers },
                };
            });
        }
    };

    const handleDrop = (e, newTeam, position) => {
        e.preventDefault();
        const playerData = e.dataTransfer.getData('player');
        const statusType = e.dataTransfer.getData('status');

        if (!playerData || !statusType) {
            console.log('Drop: playerData or oldTeam is not longer there');
            return;
        }

        const player = JSON.parse(playerData);

        // Filter out the dragged player and update the 'players' array of the oldTeam in the statusOfPLayers object
        removePlayer(player, statusType);

        if (!player) return;
        setTeams((prevTeams) => {
            const newTeams = { ...prevTeams };

            // Remove player from their old team and position
            Object.keys(newTeams).forEach((team) => {
                if (newTeams[team].goalie === player.username && team !== newTeam) {
                    newTeams[team].goalie = '';
                } else {
                    newTeams[team].players = newTeams[team].players.filter(
                        (p) => p.username !== player.username
                    );
                }
            });

            // If position is 'goalie', assign player as goalie, else add player to the team
            const newTeamData = { ...newTeams[newTeam] };
            if (position === 'goalie') {
                newTeamData.goalie = player.username;
            } else {
                newTeamData.players = [...newTeamData.players, player];
            }

            newTeams[newTeam] = newTeamData;
            return newTeams;
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        fetch('/games/Game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teams),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    console.log(teams);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
            <h1 style={{ textAlign: 'center' }}>Players Status</h1>

            <h2 style={{ textAlign: 'center' }}>
                {new Date(statusOfPLayers.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </h2>
            <div style={{ backgroundColor: '#f2f2f2' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '50px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
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
                                    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                                    border: '2px solid #003da5', // Add a border color similar to hockey rink blue
                                }}
                                key={key}
                            >
                                <h1 style={{ color: '#003da5' }}>{key}</h1>{' '}
                                {/* Change the color to hockey rink blue */}
                                {statusOfPLayers[key].players.map((singlePlayer, playerIndex) => (
                                    <div key={playerIndex}>
                                        <p
                                            onDragStart={(e) => {
                                                handleDragStart(e, singlePlayer, key);
                                            }}
                                            draggable
                                            style={{
                                                backgroundColor: '#f2f2f2',
                                                borderRadius: '5px',
                                                padding: '10px',
                                                margin: '10px 0',
                                                cursor: 'grab',
                                                fontWeight: 'bold', // Make the player names bold
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

                <form onSubmit={onSubmit}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            backgroundImage:
                                'url("https://media.istockphoto.com/id/1354857034/photo/empty-stands-of-the-ice-arena-and-clean-ice-cut-by-skates.jpg?s=612x612&w=0&k=20&c=V0ua8ZV_MSZyWO7hmyNV-KLAcgiawYSz2bqbtikpPYU=")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            zIndex: '0',
                            width: '100%',
                            height: '800px',
                        }}
                    >
                        {teamNameKeys.map((teamName, index) => (
                            <div
                                key={teamName}
                                style={{
                                    marginTop: '120px',
                                    padding: '80px',
                                    zIndex: '1',
                                    color: index % 2 === 0 ? 'white' : 'black',
                                    backgroundColor: index % 2 === 0 ? 'black' : 'white',
                                    fontFamily: 'Arial Black, Gadget, sans-serif',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                    borderRadius: '10px',
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const position = e.target.getAttribute('data-position');
                                    handleDrop(e, teamName, position);
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <h2>🏒 Team: {teams[teamName].Team}</h2>
                                <p
                                    draggable
                                    onDragStart={(e) => {
                                        handleDragStart(e, teams[teamName].goalie);
                                    }}
                                    data-position='goalie'
                                >
                                    🥅 Goalie: {teams[teamName].goalie}
                                </p>
                                <p> 🏒 Players:</p>
                                <ol>
                                    {teams[teamName].players.map((player) => (
                                        <li
                                            data-position='players'
                                            key={player.name}
                                            draggable
                                            onDragStart={(e) => {
                                                handleDragStart(e, player);
                                            }}
                                        >
                                            {player.name}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </div>
                    <Button
                        title='Submit'
                        color='#0074D9'
                        width={'150px'}
                        type='submit'
                        marginTop={'20px'}
                    />
                </form>
            </div>
        </>
    );
};

export default MatchUp;