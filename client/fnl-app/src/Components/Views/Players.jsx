import React from 'react';
import { useEffect, useState } from 'react';
import Card from '../Molecules/Card/Card';
import Button from '../Atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Players = () => {
    const [players, setPlayers] = useState([]);
    const { isAuthenticated, user, logout } = useAuth0();
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/addPlayer`);
    };

    useEffect(() => {
        fetch('/players/players')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((responseData) => {
                setPlayers(responseData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    console.log(players);
    return (
        <div style={{ margin: '20px' }}>
            <h1>FNL Players</h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginRight: '10px',
                }}
            >
                {user.name === 'Navdeep Dhamrait' ? (
                    <Button title='Add Player' onClick={onClick} color='#0074D9' width={'205px'} />
                ) : null}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card fnlPlayers={players} />
            </div>
        </div>
    );
};

export default Players;
