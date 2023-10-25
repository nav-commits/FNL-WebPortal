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
                            backgroundColor: '#f5f5f5',
                            width: '200px',
                            color: 'black',
                            margin: '50px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h3 style={{ color: '#333' }}>Week {formData.week}</h3>
                        <p style={{ color: '#666' }}>Date: {formData.date}</p>
                        <div>
                            <h4 style={{ color: '#333' }}>Team White</h4>
                            <p style={{ color: '#666' }}>Goalie: {formData.game.teamWhite.goalie}</p>
                            <ul style={{ listStyle: 'none' }}>
                                {formData.game.teamWhite.players.map((player, index) => (
                                    <li key={index} style={{ color: '#666' }}>PlayerName: {player.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: '#333' }}>Team Black</h4>
                            <p style={{ color: '#666' }}>Goalie: {formData.game.teamBlack.goalie}</p>
                            <ul style={{ listStyle: 'none' }}>
                                {formData.game.teamBlack.players.map((player, index) => (
                                    <li key={index} style={{ color: '#666' }}>PlayerName: {player.name}</li>
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