import React from 'react';
import { useContext } from 'react';
import FormDataContext from '../Context';
import Button from '../Atoms/Button/Button';
import { weeks } from '../Utils';
const MatchResults = () => {
    const { formDataArray } = useContext(FormDataContext);
    const [open, setOpen] = React.useState(false);
    const [filterWeek, setFilterWeek] = React.useState([]);
    const filterByWeek = (number) => {
        setFilterWeek(formDataArray.filter((formData) => formData.week === number));
    };

    const onClick = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        if (filterWeek.length === 0) {
            filterByWeek(weeks[0]);
        }
    }, [formDataArray]);
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>All Weekly Matches </h1>
            {/*  have a dropdown of all dates and filter by that */}
            <div style={{ margin: '30px' }}>
                <Button title='Filter by weeks' onClick={onClick} color='#0074D9' width={'205px'} />
                {open && (
                    <div
                        style={{
                            width: '200px',
                            border: '1px solid black',
                            borderRadius: '10px',
                        }}
                    >
                        {weeks.map((week, index) => (
                            <div key={index} style={{ padding: '2px' }}>
                                <p
                                    style={{ cursor: 'pointer', marginLeft: '50px' }}
                                    onClick={() => filterByWeek(week)}
                                >
                                    week{week}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {filterWeek.length > 0 ? (
                    filterWeek.map((formData, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '10px',
                                backgroundColor: '#f5f5f5',
                                color: 'black',
                                margin: '20px',
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
                                        <li
                                            key={index}
                                            style={{
                                                color: '#666',
                                            }}
                                        >
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
                                        <li
                                            key={index}
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            PlayerName: {player.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4>IR/Out</h4>
                                <ul style={{ listStyle: 'none' }}>
                                    {formData.game.irAndOut.players.map((player, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            PlayerName: {player.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4>Week To Week</h4>
                                <ul style={{ listStyle: 'none' }}>
                                    {formData.game.weekToWeek.players.map((player, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            PlayerName: {player.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4>Month To Month</h4>
                                <ul style={{ listStyle: 'none' }}>
                                    {formData.game.monthToMonth.players.map((player, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            PlayerName: {player.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 style={{ textAlign: 'center', marginTop: '120px' }}>No match results</h3>
                )}
            </div>
        </div>
    );
};

export default MatchResults;
