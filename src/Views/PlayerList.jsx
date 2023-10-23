import React, { useEffect, useState } from 'react';
import Button from '../Atoms/Button/Button';
import Input from '../Atoms/Input/Input';
const PlayerList = () => {
    const [formData, setFormData] = useState({
        gameResults: {
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

    const handlePlayerNameChange = (gameResults, team, player, newName) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            updatedData[gameResults][team][player] = newName;
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
            gameResults: {
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
            <h1 style={{ textAlign: 'center' }}>Roll Call</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div className='team'>
                        <h3>Team White</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                value={formData.gameResults.teamWhite.goalie}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamWhite', 'goalie', e.target.value)
                                }
                                placeholder='Goalie'
                            />
                            <Input
                                value={formData.gameResults.teamWhite.player1}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamWhite', 'player1', e.target.value)
                                }
                                placeholder='Player 1'
                            />
                            <Input
                                value={formData.gameResults.teamWhite.player2}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamWhite', 'player2', e.target.value)
                                }
                                placeholder='Player 2'
                            />
                            <Input
                                value={formData.gameResults.teamWhite.player3}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamWhite', 'player3', e.target.value)
                                }
                                placeholder='Player 3'
                            />
                            <Input
                                value={formData.gameResults.teamWhite.player4}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamWhite', 'player4', e.target.value)
                                }
                                placeholder='Player 4'
                            />
                            <Input
                                value={formData.gameResults.teamWhite.player5}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamWhite', 'player5', e.target.value)
                                }
                                placeholder='Player 5'
                            />
                            <Input
                                value={formData.gameResults.teamWhite.player6}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamWhite', 'player6', e.target.value)
                                }
                                placeholder='Player 6'
                            />
                        </div>
                    </div>
                    <div className='team'>
                        <h3>Team Black</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                value={formData.gameResults.teamBlack.goalie}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamBlack', 'goalie', e.target.value)
                                }
                                placeholder='Goalie'
                            />
                            <Input
                                value={formData.gameResults.teamBlack.player1}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamBlack', 'player1', e.target.value)
                                }
                                placeholder='Player 1'
                            />
                            <Input
                                value={formData.gameResults.teamBlack.player2}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamBlack', 'player2', e.target.value)
                                }
                                placeholder='Player 2'
                            />
                            <Input
                                value={formData.gameResults.teamBlack.player3}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamBlack', 'player3', e.target.value)
                                }
                                placeholder='Player 3'
                            />
                            <Input
                                value={formData.gameResults.teamBlack.player4}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamBlack', 'player4', e.target.value)
                                }
                                placeholder='Player 4'
                            />
                            <Input
                                value={formData.gameResults.teamBlack.player5}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamBlack', 'player5', e.target.value)
                                }
                                placeholder='Player 5'
                            />
                            <Input
                                value={formData.gameResults.teamBlack.player6}
                                onChange={(e) =>
                                    handlePlayerNameChange('gameResults', 'teamBlack', 'player6', e.target.value)
                                }
                                placeholder='Player 6'
                            />
                        </div>
                    </div>

                    <Button title='Submit' />
                </form>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '70px',
                    alignItems: 'stretch',
                }}
            >
                {formDataArray.map((formData, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                justifyContent: 'space-around',
                                padding: '10px',
                                backgroundColor: 'white',
                                width: '200px',
                                color: 'black',
                                margin: '50px',
                                border: '1px solid black',
                                borderRadius: '10px',
                            }}
                        >
                            <div >
                                <h3>Week: {formData.week}</h3>
                                <h2>Date: {formData.date}</h2>
                                <h3>Team: {formData.gameResults.teamWhite.Team}</h3>
                                <p>Goalie: {formData.gameResults.teamWhite.goalie}</p>
                                <p>player1:{formData.gameResults.teamWhite.player1}</p>
                                <p>player2:{formData.gameResults.teamWhite.player2}</p>
                                <p>player3:{formData.gameResults.teamWhite.player3}</p>
                                <p>player4:{formData.gameResults.teamWhite.player4}</p>
                                <p>player5:{formData.gameResults.teamWhite.player5}</p>
                                <p>player6:{formData.gameResults.teamWhite.player6}</p>

                                <h3>Team: {formData.gameResults.teamBlack.Team}</h3>
                                <p>Goalie: {formData.gameResults.teamBlack.goalie}</p>
                                <p>player1:{formData.gameResults.teamBlack.player1}</p>
                                <p>player2:{formData.gameResults.teamBlack.player2}</p>
                                <p>player3:{formData.gameResults.teamBlack.player3}</p>
                                <p>player4:{formData.gameResults.teamBlack.player4}</p>
                                <p>player5:{formData.gameResults.teamBlack.player5}</p>
                                <p>player6:{formData.gameResults.teamBlack.player6}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PlayerList;



