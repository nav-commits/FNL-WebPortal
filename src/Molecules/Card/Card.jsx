import React from 'react';
import '../Card/Card.css';

function Card({ fnlPlayers }) {
    return (
        <>
            {fnlPlayers.map((player, index) => (
                <div key={index} className='card'>
                    <div className='cardImageContainer'>
                        <img
                            src={player.imageUrl}
                            alt={player.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{player.name}</h3>
                        <p style={{ fontSize: '1rem', margin: '5px 0' }}>Age: {player.age}</p>
                        {player.team.map((team, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                <p style={{ fontSize: '1rem', margin: '5px 0' }}>
                                    Team: {player.team[index]}
                                </p>
                            </div>
                        ))}
                        <p style={{ fontSize: '1rem', margin: '5px 0' }}>
                            Shoot Hand: {player.shootHand}
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Card;
