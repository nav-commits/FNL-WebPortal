import React from 'react';
import { useContext } from 'react';
import FormDataContext from '../Context';
const MatchResults = () => {
    const { formDataArray } = useContext(FormDataContext);
    console.log(formDataArray);
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>All Weekly Matches </h1>
            {/*  have a dropdown of all dates and filter by that */}
            {/* <h2>filter matches by</h2> */}
            {formDataArray.length > 0 ? formDataArray.map((formData, index) => (
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
                        <p style={{ color: '#666' }}>
                            Goalie: {formData.game.teamWhite.goalie}
                        </p>
                        <ul style={{ listStyle: 'none' }}>
                            {formData.game.teamWhite.players.map((player, index) => (
                                <li key={index} style={{ color: '#666', fontWeight: 'bold', padding: '10px' }}>
                                    PlayerName: {player.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: '#333' }}>Team Black</h4>
                        <p style={{ color: '#666' }}>
                            Goalie: {formData.game.teamBlack.goalie}
                        </p>
                        <ul style={{ listStyle: 'none' }}>
                            {formData.game.teamBlack.players.map((player, index) => (
                                <li key={index} style={{ color: '#666', fontWeight: 'bold', padding: '10px' }}>
                                    PlayerName: {player.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4>IR/Out</h4>
                        <ul style={{ listStyle: 'none' }}>
                            {formData.game.irAndOut.players.map((player, index) => (
                                <li key={index} style={{ color: '#666', fontWeight: 'bold', padding: '10px' }}>
                                    PlayerName: {player.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Week To Week</h4>
                        <ul style={{ listStyle: 'none' }}>
                            {formData.game.weekToWeek.players.map((player, index) => (
                                <li key={index} style={{ color: '#666', fontWeight: 'bold', padding: '10px' }}>
                                    PlayerName: {player.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4>Month To Month</h4>
                        <ul style={{ listStyle: 'none' }}>
                            {formData.game.monthToMonth.players.map((player, index) => (
                                <li key={index} style={{ color: '#666', fontWeight: 'bold', padding: '10px' }}>
                                    PlayerName: {player.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )) : <h3 style={{ textAlign: 'center', marginTop: '120px' }}>No match results</h3>}
        </div>
    );
};

export default MatchResults;
