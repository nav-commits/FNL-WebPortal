import React from 'react';

function MatchResults({ formDataArray }) {
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>All Matches </h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '70px',
                    alignItems: 'stretch',
                }}
            >
                {formDataArray.map((formData, index) => (
                    <div
                        key={index}
                        style={{
                            justifyContent: 'space-around',
                            padding: '10px',
                            backgroundColor: 'white',
                            width: '200px',
                            color: 'black',
                            margin: '50px',
                            border: '1px solid black',
                            borderRadius: '10px',
                        }}
                    >
                        <h3>Week {formData.week}</h3>
                        <p>Date: {formData.date}</p>
                        <div>
                            <h4>Team White</h4>
                            <p>Goalie: {formData.game.teamWhite.goalie}</p>
                            <ul style={{listStyle:'none'}} >
                                {formData.game.teamWhite.players.map((player, index) => (
                                    <li key={index}>PlayerName: {player.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>Team Black</h4>
                            <p>Goalie: {formData.game.teamBlack.goalie}</p>
                            <ul style={{ listStyle: 'none' }}>
                                {formData.game.teamBlack.players.map((player, index) => (
                                    <li key={index}>PlayerName: {player.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MatchResults;
