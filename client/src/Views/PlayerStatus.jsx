import React, { useState } from 'react';
import { fnlPlayers } from '../Utils';

function PlayerStatus() {
    const [players, setPlayers] = useState(fnlPlayers);

    const [categories, setCategories] = useState([
        { id: 'month to Month', name: 'month to Month', players: [] },
        { id: 'week to Week', name: 'week to Week', players: [] },
        { id: 'IR', name: 'IR', players: [] },
        { id: '50/50', name: '50/50', players: [] },
    ]);

    const handleDragStart = (e, player) => {
        e.dataTransfer.setData('playerId', player.id);
    };

    const handleDrop = (e, category) => {
        e.preventDefault();
        const playerId = e.dataTransfer.getData('playerId');
        const player = players.find((p) => p.id === +playerId);
        if (!player) {
            console.error(`No player found with id ${playerId}`);
            return;
        }
        const updatedCategories = categories.map((cat) => {
            // If the player is in the category where we want to move him
            if (cat.id === category.id) {
                // If the player is not already in this category, add him
                if (!cat.players.some((p) => p.id === +playerId)) {
                    return {
                        ...cat,
                        players: [...cat.players, player],
                    };
                }
            } else {
                // If the player is in any other category, remove him
                if (cat.players.some((p) => p.id ===  +playerId)) {
                    return {
                        ...cat,
                        players: cat.players.filter((p) => p.id !== +playerId),
                    };
                }
            }
            return cat;
        });

        setCategories(updatedCategories);
    };

 
    const renderPlayer = (player) => (
        <div key={player.id} onDragStart={(e) => handleDragStart(e, player)} draggable>
            {player.name}
        </div>
    );

    const renderCategory = (category) => (
        <div
            key={category.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, category)}
            className='category'
            style={{
                border: '1px solid #000',
                borderRadius: '10px',
                backgroundColor: '#f9f9f9',
                margin: '10px',
                padding: '20px',
                width: '250px',
            }}
        >
            <h3 style={{ color: '#333', textAlign: 'left' }}>{category.name}</h3>
            <ol>
                {category.players.map((player) => (
                    <li>{renderPlayer(player)}</li>
                ))}
            </ol>
        </div>
    );

    return (
        <div style={{ margin: '50px' }}>
            <div className='players'>
                <h2>Players</h2>
                {players.map((player) => renderPlayer(player))}
            </div>
            <div style={{ margin: '30px' }}>
                <h2 style={{ textAlign: 'center' }}>Categories</h2>
                <div
                    style={{
                        margin: '30px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    {categories.map((category) => renderCategory(category))}
                </div>
            </div>
        </div>
    );
}

export default PlayerStatus;
