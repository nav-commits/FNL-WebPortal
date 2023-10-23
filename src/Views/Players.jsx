import React from 'react';
import { fnlPlayers } from '../Utils';

const Players = () => {
    return (
        <div style={{ margin: '20px' }}>
            <h1>FNL Players</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {fnlPlayers.map((player, index) => (
                    <div
                        key={index}
                        style={{
                            margin: '10px',
                            padding: '10px',
                            width: '250px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                        }}
                    >
                        <div style={{ width: '100%', height: '250px', overflow: 'hidden', borderRadius: '10px' }}>
                            <img src={player.imageUrl} alt={player.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{player.name}</h3>
                            <p style={{ fontSize: '1rem', margin: '5px 0' }}>Age: {player.age}</p>
                            <p style={{ fontSize: '1rem', margin: '5px 0' }}>Shoot Hand: {player.shootHand}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Players;