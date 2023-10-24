import React from 'react';
import { fnlPlayers } from '../Utils';
import Card from '../Molecules/Card/Card';

const Players = () => {
    return (
        // will be replaced with players api when created
        <div style={{ margin: '20px' }}>
            <h1>FNL Players</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card fnlPlayers={fnlPlayers} />
            </div>
        </div>
    );
};

export default Players;
