import React from 'react';
import Button from '../Atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();

    const onClick = (route) => {
        navigate(`/${route}`);
    };
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: '20px',
                    marginTop: '20px',
                }}
            >
                <Button
                    title='Login'
                    color='#2196f3'
                    width={'200px'}
                    onClick={() => loginWithRedirect()}
                />
            </div>

            <div style={{ textAlign: 'center' }}>
                <h1>Welcome to the FNL Hockey Portal!</h1>
                <p>
                    This is your one-stop destination for everything FNL Hockey. Explore games,
                    learn more about teams, and immerse yourself in the thrilling world of FNL
                    Hockey.
                </p>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '50px',
                        gap: '20px',
                    }}
                >
                    <Button
                        title='Check Player Status'
                        color='#2196f3'
                        width={'200px'}
                        onClick={() => onClick('PlayerStatus')}
                    />
                    <Button
                        title='Learn About Players'
                        color='#2196f3'
                        width={'200px'}
                        onClick={() => onClick('Players')}
                    />
                </div>

                <p>Don't miss out on the latest FNL Hockey action. Get your tickets now!</p>
            </div>
        </>
    );
}

export default Home;
