import React from 'react';
import Button from '../Atoms/Button/Button';
function Home() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome to the FNL Portal!</h1>
            <p>Here you will find all sorts of interesting things.</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', gap:'20px' }}>
                <Button title='Explore'  color='#2196f3' width={'200px'} />
                <Button title='Learn More' color='#2196f3' width={'200px'} />
            </div>
        </div>
    );
}

export default Home;
