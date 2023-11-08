import React, { useEffect, useState } from 'react';
import { fnlPlayers } from '../Utils';
import { useNavigate } from 'react-router-dom';
import Button from '../Atoms/Button/Button';

function PlayerStatus() {
    const [players, setPlayers] = useState(fnlPlayers);
    const [newResourceId, setNewResourceId] = useState(null);

    const [categories, setCategories] = useState([
        { id: 'monthToMonth', name: 'monthToMonth', players: [] },
        { id: 'weekToWeek', name: 'weekToWeek', players: [] },
        { id: 'IR', name: 'IR', players: [] },
        { id: 'fiftyFifty', name: 'fiftyFifty', players: [] },
    ]);

    const handleDragStart = (e, player) => {
        e.dataTransfer.setData('player', JSON.stringify(player));
    };
    const handleDrop = (e, category) => {
        e.preventDefault();
        // Retrieve the player object from the data transfer
        const player = JSON.parse(e.dataTransfer.getData('player'));
        console.log(player);

        // Create a copy of the players array and remove the player
        const updatedPlayers = players.filter((p) => p.username !== player.username);

        const updatedCategories = categories.map((cat) => {
            // If the player is in the category where we want to move him
            if (cat.id === category.id) {
                // If the player is not already in this category, add him
                if (!cat.players.some((p) => p.username === player.username)) {
                    return {
                        ...cat,
                        players: [...cat.players, player],
                    };
                }
            } else {
                // If the player is in any other category, remove him
                if (cat.players.some((p) => p.username === player.username)) {
                    return {
                        ...cat,
                        players: cat.players.filter((p) => p.username !== player.username),
                    };
                }
            }
            return cat;
        });

        setPlayers(updatedPlayers);
        setCategories(updatedCategories);
    };

    const handleSubmit = (e) => {
        console.log('submitting');
        e.preventDefault();
        const categoriesObject = categories.reduce((obj, category) => {
            obj[category.id] = category;
            console.log(category);
            return obj;
        }, {});
        console.log(categoriesObject);
        fetch('/playerStatus/addPlayerStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoriesObject),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Success:', data);
                setNewResourceId(data._id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const navigate = useNavigate();
    const matchHandler = () => {
        navigate(`/Matchup/${newResourceId}`);
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
            <form onSubmit={handleSubmit}>
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

                <Button title='Submit' color='#0074D9' width={'205px'} type='submit' />
            </form>
            <Button
                marginTop={'20px'}
                title='Matchup'
                color='#0074D9'
                width={'205px'}
                type={'button'}
                onClick={matchHandler}
            />
        </div>
    );
}

export default PlayerStatus;
