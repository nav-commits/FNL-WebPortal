import React from 'react';
import { useContext, useEffect } from 'react';
import mainContext from '../../Context';
import Button from '../Atoms/Button/Button';
import { useAuth0 } from '@auth0/auth0-react';

const MatchResults = () => {
    const { matchupResults, setMatchResults } = useContext(mainContext);
    const { getAccessTokenSilently, logout } = useAuth0();
    const [open, setOpen] = React.useState(false);
    const [filterWeek, setFilterWeek] = React.useState([]);
    const [weekNumber, setWeekNumber] = React.useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('games/Games', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Response:', response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                setMatchResults(responseData);
                setWeekNumber((prevWeekNumber) => (prevWeekNumber ? prevWeekNumber + 1 : 1)); // Increment week number
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    const filterByWeek = (index) => {
        if (index >= 0 && index < matchupResults.length) {
            setFilterWeek([matchupResults[index]]);
            setWeekNumber(index + 1); // Update the weekNumber state
        } else {
            setFilterWeek([]);
        }
    };

    console.log(filterWeek);

    const onClick = () => {
        setOpen(!open);
    };

    const weeks = matchupResults.map((result, index) => index + 1); // Define weeks here

    React.useEffect(() => {
        if (filterWeek.length === 0 && matchupResults.length > 0 && weekNumber) {
            filterByWeek(matchupResults.length - 1); // Filter by the last week
        }
    }, [matchupResults, filterWeek, weekNumber]);

    console.log(weekNumber);
    let date = new Date(matchupResults[weekNumber - 1]?.createdAt);
    let monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    let formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
            <div style={{ position: 'relative' }}>
                <h1 style={{ textAlign: 'center' }}>All Weekly Matches </h1>
                <Button title='Filter by weeks' marginLeft={"20px"} onClick={onClick} color='#0074D9' width={'205px'} />
                {open && (
                    <div
                        style={{
                            width: '200px',
                            position: 'absolute',
                            border: '1px solid black',
                            borderRadius: '10px',
                            zIndex: 1,
                            margin: '10px',
                            backgroundColor: '#fff',
                            padding: '10px',
                        }}
                    >
                        {weeks.map((week, index) => (
                            <div key={index} style={{ padding: '2px' }}>
                                <p
                                    style={{ cursor: 'pointer', marginLeft: '50px' }}
                                    onClick={() => filterByWeek(index)}
                                >
                                    week{week}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                                    width: '300px',
                                }}
                            >
                                <h3 style={{ color: '#333' }}>Week {weekNumber}</h3>
                                <p style={{ color: '#666' }}>Date: {formattedDate}</p>
                                {formData.seriesWinner.winner && (
                                    <p>
                                        SeriesWinner : <b>{formData.seriesWinner.winner}</b>
                                    </p>
                                )}
                                {Object.keys(formData)
                                    .filter(
                                        (team) =>
                                            ![
                                                '_id',
                                                'createdAt',
                                                '__v',
                                                'Goalie',
                                                'seriesWinner',
                                            ].includes(team)
                                    )
                                    .map((team) => (
                                        <div key={team}>
                                            <h4 style={{ color: '#333' }}>{team}</h4>
                                            <ul style={{ listStyle: 'none' }}>
                                                {formData[team] && formData[team].players
                                                    ? formData[team].players.map((player, index) => (
                                                        <li key={index} style={{ color: '#666' }}>
                                                            PlayerName: {player.name}
                                                        </li>
                                                    ))
                                                    : null}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                        ))
                    ) : (
                        <h3 style={{ textAlign: 'center', marginTop: '120px' }}>No match results</h3>
                    )}
                </div>
            </div>
        
        </>
        
    );
};

export default MatchResults;
