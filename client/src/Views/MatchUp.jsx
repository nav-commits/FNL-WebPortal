import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MatchUp = () => {
    const [statusOfPLayers, setStatusOfPLayers] = useState([]);
    const [teams, setTeams] = useState({
        game: {
            teamWhite: {
                Team: 'White',
                players: [],
                goalie: '',
            },
            teamBlack: {
                Team: 'Black',
                players: [],
                goalie: '',
            },
        },
    });

    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        // Use the ID to fetch the data
        fetch(`/playerStatus/status/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('Success:', data);
                // Use the data to update your state variables
                setStatusOfPLayers(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const copyData = [{ ...statusOfPLayers, id: statusOfPLayers._id }];
    console.log(copyData);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>FNL Roll Call</h1>
            <h1 style={{ textAlign: 'center' }}>Players Status</h1>
            <h3 style={{ textAlign: 'center' }}>Make Teams</h3>
          
        </>
    );
};

export default MatchUp;
