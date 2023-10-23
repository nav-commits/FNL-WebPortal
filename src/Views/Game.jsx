import React, { useEffect, useState } from 'react';
import Button from '../Atoms/Button/Button';
import MatchResults from './MatchResults';
import Input from '../Atoms/Input/Input';

const Game = () => {
    const [formDataArray, setFormDataArray] = useState([]);
    const [teamWhiteGoalie, setTeamWhiteGoalie] = useState('');
    const [teamBlackGoalie, setTeamBlackGoalie] = useState('');
    const [teamWhitePlayers, setTeamWhitePlayers] = useState([{ name: '' }]);
    const [teamBlackPlayers, setTeamBlackPlayers] = useState([{ name: '' }]);

    const [formData, setFormData] = useState({
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

    const handlePlayerNameChange = (team, playerIndex, newName, playerType) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            if (playerType === 'goalie') {
                updatedData.game[team].goalie = newName;
            } else {
                updatedData.game[team].players = updatedData.game[team].players.map(
                    (player, index) => {
                        if (index === playerIndex) {
                            player.name = newName;
                        }
                        return player;
                    }
                );
            }
            return updatedData;
        });
    };

    const handleAddPlayer = (team) => {
        if (team === 'teamWhite') {
            setTeamWhitePlayers((prevPlayers) => [...prevPlayers, { name: '' }]);
        } else {
            setTeamBlackPlayers((prevPlayers) => [...prevPlayers, { name: '' }]);
        }
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            updatedData.game[team].players.push({});
            return updatedData;
        });
    };
    const removePlayer = (team, playerIndex) => {
        if (team === 'teamWhite') {
            setTeamWhitePlayers((prevPlayers) =>
                prevPlayers.filter((player, index) => index !== playerIndex)
            );
        } else {
            setTeamBlackPlayers((prevPlayers) =>
                prevPlayers.filter((player, index) => index !== playerIndex)
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the current date to the form data
        const currentDate = new Date().toLocaleDateString();
        const updatedFormData = {
            ...formData,
            date: currentDate,
            week: formDataArray.length + 1,
        };
        // Save the form data to local storage
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
        // Push the form data into the array
        setFormDataArray((prevDataArray) => [...prevDataArray, updatedFormData]);
    };

    useEffect(() => {
        // Load the form data array from local storage
        const savedFormDataArray = JSON.parse(localStorage.getItem('formDataArray'));
        if (savedFormDataArray) {
            setFormDataArray(savedFormDataArray);
        }
    }, []);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div className='team'>
                        <h3>Team White   <span role="img" aria-label="White Flag">🏳️</span></h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                value={teamWhiteGoalie}
                                onChange={(e) => {
                                    setTeamWhiteGoalie(e.target.value);
                                    handlePlayerNameChange(
                                        'teamWhite',
                                        null,
                                        e.target.value,
                                        'goalie'
                                    );
                                }}
                                placeholder='Goalie'
                            />
                            {teamWhitePlayers.map((player, index) => (
                                <>
                                    <Input
                                        key={index}
                                        value={player.name}
                                        onChange={(e) => {
                                            const newPlayers = [...teamWhitePlayers];
                                            newPlayers[index].name = e.target.value;
                                            setTeamWhitePlayers(newPlayers);
                                            handlePlayerNameChange(
                                                'teamWhite',
                                                index,
                                                e.target.value,
                                                'player'
                                            );
                                        }}
                                        placeholder={`Player ${index + 1}`}
                                    />
                                    <Button
                                        color='red'
                                        title='Remove Player'
                                        type='button'
                                        onClick={() => removePlayer('teamWhite', index)}
                                    />
                                </>
                            ))}
                            <Button
                                title='Add Player'
                                color='#007BFF'
                                type='button'
                                onClick={() => handleAddPlayer('teamWhite')}
                            />
                        </div>
                    </div>
                    <div className='team'>
                        <h3>Team Black <span role="img" aria-label="Black Flag">🏴</span></h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                value={teamBlackGoalie}
                                onChange={(e) => {
                                    setTeamBlackGoalie(e.target.value);
                                    handlePlayerNameChange(
                                        'teamBlack',
                                        null,
                                        e.target.value,
                                        'goalie'
                                    );
                                }}
                                placeholder='Goalie'
                            />
                            {teamBlackPlayers.map((player, index) => (
                                <>
                                    <Input
                                        key={index}
                                        value={player.name}
                                        onChange={(e) => {
                                            const newPlayers = [...teamBlackPlayers];
                                            newPlayers[index].name = e.target.value;
                                            setTeamBlackPlayers(newPlayers);
                                            handlePlayerNameChange(
                                                'teamBlack',
                                                index,
                                                e.target.value,
                                                'player'
                                            );
                                        }}
                                        placeholder={`Player ${index + 1}`}
                                    />
                                    <Button
                                        color='red'
                                        title='Remove Player'
                                        type='button'
                                        onClick={() => removePlayer('teamBlack', index)}
                                    />
                                </>
                            ))}

                            <Button
                                title='Add Player'
                                color='#007BFF'
                                type='button'
                                onClick={() => handleAddPlayer('teamBlack')}
                            />
                        </div>
                    </div>

                    <Button title='Submit' type='submit' color='#007BFF' />
                </form>
            </div>
            <MatchResults formDataArray={formDataArray} />
        </>
    );
};

export default Game;
