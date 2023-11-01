import React from 'react';
import { fnlPlayers } from '../Utils';
import Card from '../Molecules/Card/Card';
import Button from '../Atoms/Button/Button';

const Players = () => {
    return (
        // will be replaced with players api when created
        <div style={{ margin: '20px' }}>
            <h1>FNL Players</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '10px' }}>
                <Button title='Add Player' color='#0074D9' width={'205px'} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card fnlPlayers={fnlPlayers} />
            </div>
        </div>
    );
};

export default Players;