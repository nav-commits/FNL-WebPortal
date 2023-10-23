import React, { useEffect, useState } from 'react';
import Button from '../Atoms/Button/Button';
import Input from '../Atoms/Input/Input';
import MatchResults from './MatchResults';
const PlayerList = () => {
    const [formData, setFormData] = useState({
        game: {
            teamWhite: {
                Team: 'White',
                goalie: '',
                player1: '',
                player2: '',
                player3: '',
                player4: '',
                player5: '',
                player6: '',
            },
            teamBlack: {
                Team: 'Black',
                goalie: '',
                player1: '',
                player2: '',
                player3: '',
                player4: '',
                player5: '',
                player6: '',
            },
        },
    });

    const [formDataArray, setFormDataArray] = useState([]);

    const handlePlayerNameChange = (game, team, player, newName) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            updatedData[game][team][player] = newName;
            return updatedData;
        });
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
        // Clear the form data
        setFormData({
            game: {
                teamWhite: {
                    Team: 'White',
                    goalie: '',
                    player1: '',
                    player2: '',
                    player3: '',
                    player4: '',
                    player5: '',
                    player6: '',
                },
                teamBlack: {
                    Team: 'Black',
                    goalie: '',
                    player1: '',
                    player2: '',
                    player3: '',
                    player4: '',
                    player5: '',
                    player6: '',
                },
            },
        });
    };

    useEffect(() => {
        // Load the form data array from local storage
        const savedFormDataArray = JSON.parse(localStorage.getItem('formDataArray'));
        if (savedFormDataArray) {
            setFormDataArray(savedFormDataArray);
        }
    }, []);

    console.log(formDataArray);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div className='team'>
                        <h3>Team White</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                value={formData.game.teamWhite.goalie}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamWhite', 'goalie', e.target.value)
                                }
                                placeholder='Goalie'
                            />
                            <Input
                                value={formData.game.teamWhite.player1}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamWhite', 'player1', e.target.value)
                                }
                                placeholder='Player 1'
                            />
                            <Input
                                value={formData.game.teamWhite.player2}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamWhite', 'player2', e.target.value)
                                }
                                placeholder='Player 2'
                            />
                            <Input
                                value={formData.game.teamWhite.player3}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamWhite', 'player3', e.target.value)
                                }
                                placeholder='Player 3'
                            />
                            <Input
                                value={formData.game.teamWhite.player4}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamWhite', 'player4', e.target.value)
                                }
                                placeholder='Player 4'
                            />
                            <Input
                                value={formData.game.teamWhite.player5}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamWhite', 'player5', e.target.value)
                                }
                                placeholder='Player 5'
                            />
                            <Input
                                value={formData.game.teamWhite.player6}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamWhite', 'player6', e.target.value)
                                }
                                placeholder='Player 6'
                            />
                        </div>
                    </div>
                    <div className='team'>
                        <h3>Team Black</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                value={formData.game.teamBlack.goalie}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamBlack', 'goalie', e.target.value)
                                }
                                placeholder='Goalie'
                            />
                            <Input
                                value={formData.game.teamBlack.player1}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamBlack', 'player1', e.target.value)
                                }
                                placeholder='Player 1'
                            />
                            <Input
                                value={formData.game.teamBlack.player2}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamBlack', 'player2', e.target.value)
                                }
                                placeholder='Player 2'
                            />
                            <Input
                                value={formData.game.teamBlack.player3}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamBlack', 'player3', e.target.value)
                                }
                                placeholder='Player 3'
                            />
                            <Input
                                value={formData.game.teamBlack.player4}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamBlack', 'player4', e.target.value)
                                }
                                placeholder='Player 4'
                            />
                            <Input
                                value={formData.game.teamBlack.player5}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamBlack', 'player5', e.target.value)
                                }
                                placeholder='Player 5'
                            />
                            <Input
                                value={formData.game.teamBlack.player6}
                                onChange={(e) =>
                                    handlePlayerNameChange('game', 'teamBlack', 'player6', e.target.value)
                                }
                                placeholder='Player 6'
                            />
                        </div>
                    </div>

                    <Button title='Submit' />
                </form>
            </div>
            {/* create context for the game results */}
            <MatchResults formDataArray={formDataArray} />
        </>
    );
};

export default PlayerList;



