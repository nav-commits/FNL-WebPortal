import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import mainContext from '../../../Context';

function Navbar() {
    const { getID } = useContext(mainContext);
    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#007BFF',
                color: 'white',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ margin: 0 }}>FNL 🏒</h1>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    gap: '2rem',
                    padding: '1rem',
                    color: 'white',
                    fontFamily: 'Arial, sans-serif',
                }}
            >
                <Link
                    to='/'
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '1.2rem',
                    }}
                >
                    Home
                </Link>
                <Link
                    to='/PlayerStatus'
                    style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem' }}
                >
                    PlayerStatus
                </Link>

                <Link
                    to={`/Matchup/${getID}`}
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '1.2rem',
                    }}
                >
                    Matchup
                </Link>

                <Link
                    to='/MatchResults'
                    style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem' }}
                >
                    MatchResults
                </Link>
                <Link
                    to='/Players'
                    style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem' }}
                >
                    Players
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
