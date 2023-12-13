import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Atoms/Button/Button';
import mainContext from '../../Context';
import { useAuth0 } from '@auth0/auth0-react';

function PlayerStatus() {

    const { players, setPlayers, setGetID } = useContext(mainContext);
    const [disabled, setDisabled] = useState(true);
    const { getAccessTokenSilently, logout } = useAuth0();

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
        // Save to local storage
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
        localStorage.setItem('categories', JSON.stringify(updatedCategories));

    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('submitting');
        e.preventDefault();
        const categoriesObject = categories.reduce((obj, category) => {
            obj[category.id] = category;
            console.log(category);
            return obj;
        }, {});
        console.log(categoriesObject);

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch('/playerStatus/addPlayerStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(categoriesObject),
            });

            const data = await response.json();
            console.log('Success:', data);
            navigate(`/Matchup/${data._id}`);
            setGetID(data._id);
            // Remove players and categories from local storage
            localStorage.removeItem('players');
            localStorage.removeItem('categories');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderPlayer = (player) => (
        <div
            key={player.id}
            onDragStart={(e) => handleDragStart(e, player)}
            draggable
            style={{
                backgroundColor: '#f2f2f2',
                padding: '10px',
                margin: '10px',
                borderRadius: '5px',
            }}
        >
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
                border: '2px solid #000',
                borderRadius: '15px',
                backgroundColor: '#f9f9f9',
                margin: '10px',
                padding: '20px',
                width: '250px',
            }}
        >
            <h3 style={{ color: '#333', textAlign: 'left', fontSize: '20px', fontWeight: 'bold' }}>
                {category.name}
            </h3>
            <ol>
                {category.players.map((player) => (
                    <li>{renderPlayer(player)}</li>
                ))}
            </ol>
        </div>
    );

    const saveCategories = () => {
        localStorage.setItem('categories', JSON.stringify(categories));
        console.log('saved', categories);
        setDisabled(false)
    }

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('players/players', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setPlayers(data);
                // Save fetched players to local storage for future use
                localStorage.setItem('players', JSON.stringify(data));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const savedCategories = JSON.parse(localStorage.getItem('categories'));
        if (savedCategories) {
            setCategories(savedCategories);
        }

        const savedPlayers = JSON.parse(localStorage.getItem('players'));
        if (savedPlayers) {
            setPlayers(savedPlayers);
        } else {
            // Fetch players from the API only if they are not in the local storage
            fetchPlayers();
        }
    }, []);

    console.log(players)
    console.log(categories)

    return (
        <>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', margin:'20px' }}>
                <Button
                    title='LogOut'
                    color='#2196f3'
                    width={'200px'}
                    onClick={() => logout()}
                />

            </div>
            <div
                style={{
                    margin: '50px',
                    backgroundColor: '#e6e6e6',
                    borderRadius: '15px',
                    padding: '20px',
                }}
            >
                <div className='players'>
                    <h2 style={{ fontSize: '25px', fontWeight: 'bold', color: '#0074D9' }}>Players</h2>
                    {players.length > 0 && players.map((player) => renderPlayer(player))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ margin: '30px' }}>
                        <h2
                            style={{
                                textAlign: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                color: '#0074D9',
                            }}
                        >
                            Player Status
                        </h2>
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

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '420px',
                            margin: '0 auto',
                        }}
                    >
                        <Button
                            marginTop={'20px'}
                            title='Save'
                            color='#0074D9'
                            width={'205px'}
                            type={'button'}
                            onClick={saveCategories}
                        />
                        <Button
                            title='Submit'
                            color='#0074D9'
                            width={'150px'}
                            type='submit'
                            marginTop={'20px'}
                            disabled={disabled}
                        />

                    </div>
                </form>
            </div>
        </>
     
    );
}

export default PlayerStatus;
