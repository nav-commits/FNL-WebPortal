import React, { useState } from 'react';
import Button from '../Atoms/Button/Button';
import Input from '../Atoms/Input/Input';

function AddPlayer() {
    const [addPlayer, setAddPlayer] = useState({
        name: '',
        age: '',
        team: [''],
        username: '',
        shootHand: '',
        img: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/players/addPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addPlayer),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleChange = (event, index) => {
        if (event.target.name === 'team') {
            let newTeams = [...addPlayer.team];
            newTeams[index] = event.target.value;
            setAddPlayer({ ...addPlayer, team: newTeams });
        } else {
            setAddPlayer({ ...addPlayer, [event.target.name]: event.target.value });
        }
    };

    const handleAddTeam = () => {
        setAddPlayer({ ...addPlayer, team: [...addPlayer.team, ''] });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAddPlayer({ ...addPlayer, img: reader.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <Input
                        name='name'
                        value={addPlayer.name}
                        onChange={handleChange}
                        placeholder='Name'
                    />
                    <Input
                        name='age'
                        type='number'
                        value={addPlayer.age}
                        onChange={handleChange}
                        placeholder='Age'
                    />

                    {addPlayer.team.map((team, index) => (
                        <div key={index}>
                            Team {index + 1}:
                            <Input
                                name='team'
                                value={team}
                                onChange={(event) => handleChange(event, index)}
                                placeholder='Team'
                            />
                        </div>
                    ))}
                    <Input
                        name='username'
                        value={addPlayer.username}
                        onChange={handleChange}
                        placeholder='username'
                    />

                    <Button
                        title='Add Team'
                        onClick={handleAddTeam}
                        color='#0074D9'
                        width={'205px'}
                        type='button'
                    />

                    <Input
                        name='shootHand'
                        value={addPlayer.shootHand}
                        onChange={handleChange}
                        placeholder='Shoot Hand'
                    />

                    <Input type='file' onChange={handleImageUpload} placeholder='Image' />

                    <Button title='Add Player' color='#0074D9' width={'205px'} type='submit' />
                </div>
            </form>
        </>
    );
}

export default AddPlayer;
