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
    const [monthToMonth, setmonthToMonth] = useState([{ name: '' }]);
    const [irAndOut, setIRAndOut] = useState([{ name: '' }]);
    const [weekToWeek, setWeekToWeek] = useState([{ name: '' }]);

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
            irAndOut: {
                Team: 'irAndOut',
                players: [{}],
            },
            monthToMonth: {
                Team: 'monthToMonth',
                players: [{}],
            },
            weekToWeek: {
                Team: 'weekToWeek',
                players: [{}],
            },
        },
    });

    const handlePlayerNameChange = (team, playerIndex, newName, playerType) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            if (playerType === 'goalie') {
                updatedData.game[team].goalie = newName;
            }
            else if (playerType === 'irAndOut') {
                updatedData.game[team].players = updatedData.game[team].players.map(
                    (player, index) => {
                        if (index === playerIndex) {
                            player.name = newName;
                        }
                        return player;
                    }
                );
            }
            else if (playerType === 'weekToWeek') {
                updatedData.game[team].players = updatedData.game[team].players.map(
                    (player, index) => {
                        if (index === playerIndex) {
                            player.name = newName;
                        }
                        return player;
                    }
                );
            }
            else if (playerType === 'monthToMonth') {
                updatedData.game[team].players = updatedData.game[team].players.map(
                    (player, index) => {
                        if (index === playerIndex) {
                            player.name = newName;
                        }
                        return player;
                    }
                );
            }
            else {
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
        }
        else if (team === 'irAndOut') {
            setIRAndOut((prevPlayers) => [...prevPlayers, { name: '' }]);
        }
        else if (team === 'monthToMonth') {
            setmonthToMonth((prevPlayers) => [...prevPlayers, { name: '' }]);
        }
        else if (team === 'weekToWeek') {
            setWeekToWeek((prevPlayers) => [...prevPlayers, { name: '' }]);
        }
        else {
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
        }
        else if (team === 'irAndOut') {
            setIRAndOut((prevPlayers) =>
                prevPlayers.filter((player, index) => index !== playerIndex)
            );
        }
        else if (team === 'weekToWeek') {
            setWeekToWeek((prevPlayers) =>
                prevPlayers.filter((player, index) => index !== playerIndex)
            );
        }
        else if (team === 'monthToMonth') {
            setmonthToMonth((prevPlayers) =>
                prevPlayers.filter((player, index) => index !== playerIndex)
            );
        }
        else {
            setTeamBlackPlayers((prevPlayers) =>
                prevPlayers.filter((player, index) => index !== playerIndex)
            );
        }
    };

   
        const handleSubmit = (e) => {
            e.preventDefault();
            // Add the current date to the form data
            const currentDate = new Date().toLocaleDateString();
            const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
            const updatedFormData = {
                ...formData,
                date: currentDate,
                week: formDataArray.length + 1,
            };
            // Save the form data to local storage
            localStorage.setItem('formDataArray', JSON.stringify(updatedFormData));
            // Push the form data into the array
            setFormDataArray((prevDataArray) => [...prevDataArray, updatedFormData]);
        };
    

    useEffect(() => {
        // Load the form data array from local storage
        const savedFormDataArray = JSON.parse(localStorage.getItem('formDataArray'));
        if (savedFormDataArray.length > 0) {
            setFormDataArray(savedFormDataArray);
        }
    }, []);

    console.log(formData)

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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px' }}>
                        <h2>IR and Out</h2>
                        {irAndOut.map((player, index) => (
                            <>
                                <Input
                                    key={index}
                                    value={player.name}
                                    onChange={(e) => {
                                        const newPlayers = [...irAndOut];
                                        newPlayers[index].name = e.target.value;
                                        setIRAndOut(newPlayers);
                                        handlePlayerNameChange(
                                            'irAndOut',
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
                                    onClick={() => removePlayer('irAndOut', index)}
                                />
                            </>
                        ))}

                        <Button
                            title='Add Player'
                            color='#007BFF'
                            type='button'
                            onClick={() => handleAddPlayer('irAndOut')}
                        />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px' }}>
                        <h2>Month to Month</h2>
                        {monthToMonth.map((player, index) => (
                            <>
                                <Input
                                    key={index}
                                    value={player.name}
                                    onChange={(e) => {
                                        const newPlayers = [...monthToMonth];
                                        newPlayers[index].name = e.target.value;
                                        setmonthToMonth(newPlayers);
                                        handlePlayerNameChange(
                                            'monthToMonth',
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
                                    onClick={() => removePlayer('monthToMonth', index)}
                                />
                            </>
                        ))}

                        <Button
                            title='Add Player'
                            color='#007BFF'
                            type='button'
                            onClick={() => handleAddPlayer('monthToMonth')}
                        />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px' }}>
                        <h2>Week to week</h2>
                        {weekToWeek.map((player, index) => (
                            <>
                                <Input
                                    key={index}
                                    value={player.name}
                                    onChange={(e) => {
                                        const newPlayers = [...weekToWeek];
                                        newPlayers[index].name = e.target.value;
                                        setWeekToWeek(newPlayers);
                                        handlePlayerNameChange(
                                            'weekToWeek',
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
                                    onClick={() => removePlayer('weekToWeek', index)}
                                />
                            </>
                        ))}

                        <Button
                            title='Add Player'
                            color='#007BFF'
                            type='button'
                            onClick={() => handleAddPlayer('weekToWeek')}
                        />
                    </div>

                    <Button title='Submit' type='submit' color='#007BFF' />
                </form>
            </div>
             <MatchResults formDataArray={formDataArray} /> 
        </>
    );
};

export default Game;