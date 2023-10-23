import React from 'react';
import Button from '../Atoms/Button/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/Game')
    };
    return (
        <div style={{textAlign:'center'}}>
            <h1>Welcome FNL Portal!</h1>
            <p>Here you will find all sorts of interesting things.</p>
            <Button title='Click Me!' onClick={handleButtonClick} />
        </div>
    );
}

export default Home;
