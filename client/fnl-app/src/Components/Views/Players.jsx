import React from 'react';
import { useEffect, useState } from 'react';
import Card from '../Molecules/Card/Card';
import Button from '../Atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Players = () => {
    const [players, setPlayers] = useState([]);
    const { user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/addPlayer`);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('/players/players', {
                    headers: {
                        Authorization:`Bearer ${token}`,
                    },
                });

                console.log('Response:', response);

                if (!response.ok) {
                    throw new Error(`Network response was not ok, status code: ${response.status}`);
                }

                const responseData = await response.json();
                setPlayers(responseData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently]);

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
