import React, { useContext, useEffect, useState } from 'react';
import Button from '../Atoms/Button/Button';
import InputAndButtons from '../Molecules/InputAndButtons/InputAndButtons';
import Input from '../Atoms/Input/Input';
import { fnlPlayers } from '../Utils';
import Dropdown from '../Molecules/Dropdown/Dropdown';
import FormDataContext from '../Context';

const MatchUp = () => {
    const { setFormDataArray, FormDataArray } = useContext(FormDataContext);
    const [teamWhiteGoalie, setTeamWhiteGoalie] = useState('');
    const [teamBlackGoalie, setTeamBlackGoalie] = useState('');
    const [teamWhitePlayers, setTeamWhitePlayers] = useState([{ name: '' }]);
    const [teamBlackPlayers, setTeamBlackPlayers] = useState([{ name: '' }]);
    const [monthToMonth, setmonthToMonth] = useState([{ name: '' }]);
    const [irAndOut, setIRAndOut] = useState([{ name: '' }]);
    const [weekToWeek, setWeekToWeek] = useState([{ name: '' }]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [weekNumber, setWeekNumber] = useState(1);
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
    };

    const handlePlayerNameChange = (team, playerIndex, newName, playerType) => {
        filterPlayersDropdown(newName);
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

            case `teamWhitePlayer-${playerIndex}`:
                const newTeamWhitePlayers = [...teamWhitePlayers];
                newTeamWhitePlayers[playerIndex] = { ...newTeamWhitePlayers[playerIndex], name };
                handlePlayerNameChange('teamWhite', playerIndex, name, 'player');
                setTeamWhitePlayers(newTeamWhitePlayers);
                setFilteredPlayers([]);
                break;

            case `teamBlackPlayer-${playerIndex}`:
                const newTeamBlackPlayers = [...teamBlackPlayers];
                newTeamBlackPlayers[playerIndex] = { ...newTeamBlackPlayers[playerIndex], name };
                handlePlayerNameChange('teamBlack', playerIndex, name, 'player');
                setTeamBlackPlayers(newTeamBlackPlayers);
                setFilteredPlayers([]);
                break;

            case `irAndOut-${playerIndex}`:
                const newIRAndOut = [...irAndOut];
                newIRAndOut[playerIndex] = { ...newIRAndOut[playerIndex], name };
                handlePlayerNameChange('irAndOut', playerIndex, name, 'player');
                setIRAndOut(newIRAndOut);
                setFilteredPlayers([]);
                break;

            case `monthToMonth-${playerIndex}`:
                const newMonthToMonth = [...monthToMonth];
                newMonthToMonth[playerIndex] = { ...newMonthToMonth[playerIndex], name };
                handlePlayerNameChange('monthToMonth', playerIndex, name, 'player');
                setmonthToMonth(newMonthToMonth);
                setFilteredPlayers([]);

                break;
            case `weekToWeek-${playerIndex}`:
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

    const handleFocus = (fieldName, indexFound) => {
        let fieldIndex;

        switch (fieldName) {
            case 'teamWhiteGoalie':
            case 'teamBlackGoalie':
                setActiveField(fieldName);
                break;
            case 'teamWhitePlayer':
                fieldIndex = `teamWhitePlayer-${indexFound}`;
                setActiveField(fieldIndex);
                break;
            case 'teamBlackPlayer':
                fieldIndex = `teamBlackPlayer-${indexFound}`;
                setActiveField(fieldIndex);
                break;
            case 'irAndOut':
                fieldIndex = `irAndOut-${indexFound}`;
                setActiveField(fieldIndex);
                break;
            case 'monthToMonth':
                fieldIndex = `monthToMonth-${indexFound}`;
                setActiveField(fieldIndex);
                break;
            case 'weekToWeek':
                fieldIndex = `weekToWeek-${indexFound}`;
                setActiveField(fieldIndex);
                break;
            default:
                break;
        }
    };

    const handleBlur = () => {
        setActiveField(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = 'http://localhost:5000/games/game'; // Replace with your API endpoint
        fetch(url, {
            method: 'POST',
            mode: 'cors', // add this line
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('POST request failed');
                }
            })
            .then((responseData) => {
                console.log(responseData);
                setFormDataArray((prevDataArray) => [...prevDataArray, responseData]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    console.log(FormDataArray)

    useEffect(() => {
        // Load the form data array from local storage
        const savedFormDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
        if (savedFormDataArray.length > 0) {
            setFormDataArray(savedFormDataArray);
        }
    });

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
                                onFocus={() => handleFocus('teamWhiteGoalie')}
                                onBlur={handleBlur}
                            />
                            {/* dropdown */}
                            <Dropdown
                                data={filteredPlayers}
                                handleNameSelect={handleNameSelect}
                                index={null}
                                nameType={'teamWhiteGoalie'}
                                activeField={activeField}
                            />

                            {teamWhitePlayers.map((player, index) => (
                                <React.Fragment key={index}>
                                    <InputAndButtons
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
                                        onFocus={() => handleFocus('teamWhitePlayer', index)}
                                        onBlur={handleBlur}
                                    />
                                    {/* dropdown */}
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={`teamWhitePlayer-${index}`}
                                        activeField={activeField}
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
                                onFocus={() => handleFocus('teamBlackGoalie')}
                                onBlur={handleBlur}
                            />
                            {/* dropdown */}
                            <Dropdown
                                data={filteredPlayers}
                                handleNameSelect={handleNameSelect}
                                index={null}
                                nameType={'teamBlackGoalie'}
                                activeField={activeField}
                            />

                            {teamBlackPlayers.map((player, index) => (
                                <React.Fragment key={index}>
                                    <InputAndButtons
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
                                        onFocus={() => handleFocus('teamBlackPlayer', index)}
                                        onBlur={handleBlur}
                                    />
                                    {/* dropdown */}
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={`teamBlackPlayer-${index}`}
                                        activeField={activeField}
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
                                    <InputAndButtons
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
                                        onFocus={() => handleFocus('irAndOut', index)}
                                        onBlur={handleBlur}
                                    />
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        activeField={activeField}
                                        nameType={`irAndOut-${index}`}
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
                                    <InputAndButtons
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
                                        onFocus={() => handleFocus('monthToMonth', index)}
                                        onBlur={handleBlur}
                                    />
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={`monthToMonth-${index}`}
                                        activeField={activeField}
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
                                    <InputAndButtons
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
                                        onFocus={() => handleFocus('weekToWeek', index)}
                                        onBlur={handleBlur}
                                    />
                                    <Dropdown
                                        data={filteredPlayers}
                                        handleNameSelect={handleNameSelect}
                                        index={index}
                                        nameType={`weekToWeek-${index}`}
                                        activeField={activeField}
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
        </>
    );
};

export default MatchUp;
