import React, { useEffect, useState } from 'react';

const PlayerList = () => {
    const [formData, setFormData] = useState({
        teams: {
            teamWhite: {
                team: 'White',
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
        }
    });

    const handlePlayerNameChange = (teams, team, player, newName) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            updatedData[teams][team][player] = newName;
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
        };
        // Save the form data to local storage
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
        // Clear the form data
        setFormData({
            teams: {
                teamWhite: {
                    team: 'White',
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
            }
        });
    };

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('formData'));
        if (savedFormData) {
            setFormData(savedFormData);
        }
    }, []);

    console.log(formData)

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Roll Call</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div className='team'>
                        <h3>Team White</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <input
                                type='text'
                                value={formData.teams.teamWhite.goalie}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamWhite', 'goalie', e.target.value)
                                }
                                placeholder='Goalie'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player1}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamWhite', 'player1', e.target.value)
                                }
                                placeholder='Player 1'
                                style={{ width: '300px', padding: '5px' ,borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player2}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamWhite', 'player2', e.target.value)
                                }
                                placeholder='Player 2'
                                style={{ width: '300px', padding: '5px' , borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player3}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamWhite', 'player3', e.target.value)
                                }
                                placeholder='Player 3'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player4}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamWhite', 'player4', e.target.value)
                                }
                                placeholder='Player 4'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player5}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamWhite', 'player5', e.target.value)
                                }
                                placeholder='Player 5'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player6}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamWhite', 'player6', e.target.value)
                                }
                                placeholder='Player 6'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                        </div>
                    </div>
                    <div className='team'>
                        <h3>Team Black</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <input
                                type='text'
                                value={formData.teams.teamBlack.goalie}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamBlack', 'goalie', e.target.value)
                                }
                                placeholder='Goalie'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player1}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamBlack', 'player1', e.target.value)
                                }
                                placeholder='Player 1'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player2}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamBlack', 'player2', e.target.value)
                                }
                                placeholder='Player 2'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player3}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamBlack', 'player3', e.target.value)
                                }
                                placeholder='Player 3'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player4}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamBlack', 'player4', e.target.value)
                                }
                                placeholder='Player 4'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player5}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamBlack', 'player5', e.target.value)
                                }
                                placeholder='Player 5'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player6}
                                onChange={(e) =>
                                    handlePlayerNameChange('teams', 'teamBlack', 'player6', e.target.value)
                                }
                                placeholder='Player 6'
                                style={{ width: '300px', padding: '5px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
                            />
                        </div>
                    </div>
                    <button style={{ marginTop: '20px' }} type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default PlayerList;