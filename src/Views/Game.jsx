import React, { useEffect, useState } from 'react';
import Button from '../Atoms/Button/Button';
import MatchResults from './MatchResults';
import PlayerInput from '../Molecules/PlayerInput/PlayerInput';
import Input from '../Atoms/Input/Input';
import { fnlPlayers } from '../Utils';
import Dropdown from '../Molecules/Dropdown/Dropdown';

const Game = () => {
    const [formDataArray, setFormDataArray] = useState([]);
    const [teamWhiteGoalie, setTeamWhiteGoalie] = useState('');
    const [teamBlackGoalie, setTeamBlackGoalie] = useState('');
    const [teamWhitePlayers, setTeamWhitePlayers] = useState([{ name: '' }]);
    const [teamBlackPlayers, setTeamBlackPlayers] = useState([{ name: '' }]);
    const [monthToMonth, setmonthToMonth] = useState([{ name: '' }]);
    const [irAndOut, setIRAndOut] = useState([{ name: '' }]);
    const [weekToWeek, setWeekToWeek] = useState([{ name: '' }]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
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
    const filterPlayersDropdown = (name) => {
        const filtered = fnlPlayers.filter((player) => player.name.toLowerCase().includes(name));
        setFilteredPlayers(filtered);
    }

    const handlePlayerNameChange = (team, playerIndex, newName, playerType) => {
        // Filter the players dropdown
        filterPlayersDropdown(newName);
        console.log(newName);
    
        // Update the form data with the new name
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
        const newPlayer = { name: '' };
        switch (team) {
            case 'teamWhite':
                setTeamWhitePlayers((prevPlayers) => [...prevPlayers, newPlayer]);
                break;
            case 'irAndOut':
                setIRAndOut((prevPlayers) => [...prevPlayers, newPlayer]);
                break;
            case 'monthToMonth':
                setmonthToMonth((prevPlayers) => [...prevPlayers, newPlayer]);
                break;
            case 'weekToWeek':
                setWeekToWeek((prevPlayers) => [...prevPlayers, newPlayer]);
                break;
            default:
                setTeamBlackPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
                break;
        }
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            updatedData.game[team].players.push({});
            return updatedData;
        });
    };
    const removePlayer = (team, playerIndex) => {
        switch (team) {
            case 'teamWhite':
                if (teamWhitePlayers.length === 1) return;
                setTeamWhitePlayers((prevPlayers) =>
                    prevPlayers.filter((player, index) => index !== playerIndex)
                );
                break;
            case 'irAndOut':
                if (irAndOut.length === 1) return;
                setIRAndOut((prevPlayers) =>
                    prevPlayers.filter((player, index) => index !== playerIndex)
                );
                break;
            case 'weekToWeek':
                if (weekToWeek.length === 1) return;
                setWeekToWeek((prevPlayers) =>
                    prevPlayers.filter((player, index) => index !== playerIndex)
                );
                break;
            case 'monthToMonth':
                if (monthToMonth.length === 1) return;
                setmonthToMonth((prevPlayers) =>
                    prevPlayers.filter((player, index) => index !== playerIndex)
                );
                break;
            default:
                if (teamBlackPlayers.length === 1) return;
                setTeamBlackPlayers((prevPlayers) =>
                    prevPlayers.filter((player, index) => index !== playerIndex)
                );
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the current date to the form data
        const currentDate = new Date().toLocaleDateString();
        const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
        const weekNumber = formDataArray.length === 0 ? 1 : formDataArray.length + 1;
        const updatedFormData = {
            ...formData,
            date: currentDate,
            week: weekNumber,
        };
        // Save the form data to local storage
        localStorage.setItem('formDataArray', JSON.stringify(updatedFormData));
        // Push the form data into the array
        setFormDataArray((prevDataArray) => [...prevDataArray, updatedFormData]);

    };

    useEffect(() => {
        // Load the form data array from local storage
        const savedFormDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
        if (savedFormDataArray.length > 0) {
            setFormDataArray(savedFormDataArray);
        }
    }, []);

    // set the input value to the name of the player selected
    const handleNameSelect = (name, inputType, playerIndex) => {
        switch (inputType) {
            case 'teamWhiteGoalie':
                setTeamWhiteGoalie(name);
                handlePlayerNameChange('teamWhite', null, name, 'goalie');
                setFilteredPlayers([]);
                break;

            case 'teamBlackGoalie':
                setTeamBlackGoalie(name);
                handlePlayerNameChange('teamBlack', null, name, 'goalie');
                setFilteredPlayers([]);
                break;

            case 'teamWhitePlayer':
                const newTeamWhitePlayers = [...teamWhitePlayers];
                newTeamWhitePlayers[playerIndex] = { ...newTeamWhitePlayers[playerIndex], name };
                handlePlayerNameChange('teamWhite', playerIndex, name, 'player');
                setTeamWhitePlayers(newTeamWhitePlayers);
                setFilteredPlayers([]);
                break;

            case 'teamBlackPlayer':
                const newTeamBlackPlayers = [...teamBlackPlayers];
                newTeamBlackPlayers[playerIndex] = { ...newTeamBlackPlayers[playerIndex], name };
                handlePlayerNameChange('teamBlack', playerIndex, name, 'player');
                setTeamBlackPlayers(newTeamBlackPlayers);
                setFilteredPlayers([]);
                break;

            case 'irAndOut':
                const newIRAndOut = [...irAndOut];
                newIRAndOut[playerIndex] = { ...newIRAndOut[playerIndex], name };
                handlePlayerNameChange('irAndOut', playerIndex, name, 'player');
                setIRAndOut(newIRAndOut);
                setFilteredPlayers([]);
                break;

            case 'monthToMonth':
                const newMonthToMonth = [...monthToMonth];
                newMonthToMonth[playerIndex] = { ...newMonthToMonth[playerIndex], name };
                handlePlayerNameChange('monthToMonth', playerIndex, name, 'player');
                setmonthToMonth(newMonthToMonth);
                setFilteredPlayers([]);

                break;
            case 'weekToWeek':
                const newWeekToWeek = [...weekToWeek];
                newWeekToWeek[playerIndex] = { ...newWeekToWeek[playerIndex], name };
                handlePlayerNameChange('weekToWeek', playerIndex, name, 'player');
                setWeekToWeek(newWeekToWeek);
                setFilteredPlayers([]);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            justifyContent: 'space-around',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <h3>
                                Team White{' '}
                                <span role='img' aria-label='White Flag'>
                                    🏳️
                                </span>
                            </h3>
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
                            {/* dropdown */}
                            <Dropdown
                                data={filteredPlayers}
                                handleNameSelect={handleNameSelect}
                                index={null}
                                nameType={'teamWhiteGoalie'}
                            />

                            {teamWhitePlayers.map((player, index) => (
                                <React.Fragment key={index}>
                                    <PlayerInput
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
                                        onAdd={() => handleAddPlayer('teamWhite')}
                                        onRemove={() => removePlayer('teamWhite', index)}
                                    />
                                    {/* dropdown */}
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={'teamWhitePlayer'}
                                    />
                                </React.Fragment>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <h3>
                                Team Black{' '}
                                <span role='img' aria-label='Black Flag'>
                                    🏴
                                </span>
                            </h3>
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
                            {/* dropdown */}
                            <Dropdown
                                data={filteredPlayers}
                                handleNameSelect={handleNameSelect}
                                index={null}
                                nameType={'teamBlackGoalie'}
                            />

                            {teamBlackPlayers.map((player, index) => (
                                <React.Fragment key={index}>
                                    <PlayerInput
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
                                        onAdd={() => handleAddPlayer('teamBlack')}
                                        onRemove={() => removePlayer('teamBlack', index)}
                                    />
                                    {/* dropdown */}
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={'teamBlackPlayer'}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                marginTop: '50px',
                            }}
                        >
                            <h3>IR/Out</h3>
                            {irAndOut.map((player, index) => (
                                <React.Fragment key={index}>
                                    <PlayerInput
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
                                        onAdd={() => handleAddPlayer('irAndOut')}
                                        onRemove={() => removePlayer('irAndOut', index)}
                                    />
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={'irAndOut'}
                                    />
                                </React.Fragment>
                            ))}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                marginTop: '50px',
                            }}
                        >
                            <h3>Month to Month</h3>
                            {monthToMonth.map((player, index) => (
                                <React.Fragment key={index}>
                                    <PlayerInput
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
                                        onAdd={() => handleAddPlayer('monthToMonth')}
                                        onRemove={() => removePlayer('monthToMonth', index)}
                                    />
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={'monthToMonth'}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                marginTop: '50px',
                            }}
                        >
                            <h3>Week to week</h3>
                            {weekToWeek.map((player, index) => (
                                <React.Fragment key={index}>
                                    <PlayerInput
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
                                        onAdd={() => handleAddPlayer('weekToWeek')}
                                        onRemove={() => removePlayer('weekToWeek', index)}
                                    />
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={'weekToWeek'}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '50px' }}>
                        <Button title='Submit' type='submit' color='#2196f3' />
                    </div>
                </form>
            </div>
            <MatchResults formDataArray={formDataArray} />
        </>
    );
};

export default Game;
