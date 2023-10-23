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
                {formDataArray.map((formData, index) => {
                    return (
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
                            <div >
                                <h3>Week: {formData.week}</h3>
                                <h2>Date: {formData.date}</h2>
                                <h3>Team: {formData.game.teamWhite.Team}</h3>
                                <p>Goalie: {formData.game.teamWhite.goalie}</p>
                                <p>player1:{formData.game.teamWhite.player1}</p>
                                <p>player2:{formData.game.teamWhite.player2}</p>
                                <p>player3:{formData.game.teamWhite.player3}</p>
                                <p>player4:{formData.game.teamWhite.player4}</p>
                                <p>player5:{formData.game.teamWhite.player5}</p>
                                <p>player6:{formData.game.teamWhite.player6}</p>

                                <h3>Team: {formData.game.teamBlack.Team}</h3>
                                <p>Goalie: {formData.game.teamBlack.goalie}</p>
                                <p>player1:{formData.game.teamBlack.player1}</p>
                                <p>player2:{formData.game.teamBlack.player2}</p>
                                <p>player3:{formData.game.teamBlack.player3}</p>
                                <p>player4:{formData.game.teamBlack.player4}</p>
                                <p>player5:{formData.game.teamBlack.player5}</p>
                                <p>player6:{formData.game.teamBlack.player6}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>

    );
}

export default MatchResults;
