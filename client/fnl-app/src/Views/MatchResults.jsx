import React from 'react';
import { useContext, useEffect } from 'react';
import mainContext from '../Context';
import Button from '../Atoms/Button/Button';
import { weeks } from '../Utils';
const MatchResults = () => {
    const { matchupResults, setMatchResults } = useContext(mainContext);
    const [open, setOpen] = React.useState(false);
    const [filterWeek, setFilterWeek] = React.useState([]);
    const [weekNumber, setWeekNumber] = React.useState(0); // New state variable for week number

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('games/Games');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                setMatchResults(responseData);
                setWeekNumber(prevWeekNumber => prevWeekNumber ? prevWeekNumber + 1: 1); // Increment week number
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

    console.log(filterWeek)

    const onClick = () => {
        setOpen(!open);
    };

    const weeks = matchupResults.map((result, index) => index + 1); // Define weeks here

   React.useEffect(() => {
    if (filterWeek.length === 0 && matchupResults.length > 0) {
        filterByWeek(matchupResults.length - 1); // Filter by the last week
    }
}, [matchupResults, filterWeek]);

    console.log(weekNumber)

    let date = new Date(matchupResults[0]?.createdAt);
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    


    return (
        <div style={{ position: 'relative' }}>
            <h1 style={{ textAlign: 'center' }}>All Weekly Matches </h1>
            <Button title='Filter by weeks' onClick={onClick} color='#0074D9' width={'205px'} />
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
                            {Object.keys(formData)
                                .filter((team) => !['_id', 'createdAt', '__v', 'Goalie'].includes(team))
                                .map((team) => (
                                    <div key={team}>
                                        <h4 style={{ color: '#333' }}>{team}</h4>
                                        <p style={{ color: '#666' }}>Goalie: {formData[team].goalie}</p>
                                        <ul style={{ listStyle: 'none' }}>
                                            {formData[team] && formData[team].players ? formData[team].players.map((player, index) => (
                                                <li key={index} style={{ color: '#666' }}>
                                                    PlayerName: {player.name}
                                                </li>
                                            )) : null}
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
    );
};

export default MatchResults;
