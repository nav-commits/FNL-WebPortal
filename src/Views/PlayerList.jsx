import React, { useEffect, useState } from 'react';

const PlayerList = () => {
    const [formData, setFormData] = useState({
        teams: {
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
            week: formDataArray.length + 1,
        };
        // Save the form data to local storage
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
        // Push the form data into the array
        setFormDataArray((prevDataArray) => [...prevDataArray, updatedFormData]);
        // Clear the form data
        setFormData({
            teams: {
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
                            <input
                                type='text'
                                value={formData.teams.teamWhite.goalie}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamWhite',
                                        'goalie',
                                        e.target.value
                                    )
                                }
                                placeholder='Goalie'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player1}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamWhite',
                                        'player1',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 1'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player2}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamWhite',
                                        'player2',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 2'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player3}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamWhite',
                                        'player3',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 3'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player4}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamWhite',
                                        'player4',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 4'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player5}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamWhite',
                                        'player5',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 5'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamWhite.player6}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamWhite',
                                        'player6',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 6'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
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
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamBlack',
                                        'goalie',
                                        e.target.value
                                    )
                                }
                                placeholder='Goalie'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player1}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamBlack',
                                        'player1',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 1'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player2}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamBlack',
                                        'player2',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 2'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player3}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamBlack',
                                        'player3',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 3'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player4}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamBlack',
                                        'player4',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 4'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player5}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamBlack',
                                        'player5',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 5'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                            <input
                                type='text'
                                value={formData.teams.teamBlack.player6}
                                onChange={(e) =>
                                    handlePlayerNameChange(
                                        'teams',
                                        'teamBlack',
                                        'player6',
                                        e.target.value
                                    )
                                }
                                placeholder='Player 6'
                                style={{
                                    width: '300px',
                                    padding: '5px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                }}
                            />
                        </div>
                    </div>
                    <button style={{
                        marginTop: '20px', backgroundColor: '#007BFF',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px', }} type='submit'>
                        Submit
                    </button>
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
                            <div key={index}>
                                <h3>Week: {formData.week}</h3>
                                <h2>Date: {formData.date}</h2>
                                <h3>Team: {formData.teams.teamWhite.Team}</h3>
                                <p>Goalie: {formData.teams.teamWhite.goalie}</p>
                                <p>player1:{formData.teams.teamWhite.player1}</p>
                                <p>player2:{formData.teams.teamWhite.player2}</p>
                                <p>player3:{formData.teams.teamWhite.player3}</p>
                                <p>player4:{formData.teams.teamWhite.player4}</p>
                                <p>player5:{formData.teams.teamWhite.player5}</p>
                                <p>player6:{formData.teams.teamWhite.player6}</p>

                                <h3>Team: {formData.teams.teamBlack.Team}</h3>
                                <p>Goalie: {formData.teams.teamBlack.goalie}</p>
                                <p>player1:{formData.teams.teamBlack.player1}</p>
                                <p>player2{formData.teams.teamBlack.player2}</p>
                                <p>player3{formData.teams.teamBlack.player3}</p>
                                <p>player4{formData.teams.teamBlack.player4}</p>
                                <p>player5{formData.teams.teamBlack.player5}</p>
                                <p>player6{formData.teams.teamBlack.player6}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PlayerList;
