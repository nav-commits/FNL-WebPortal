import React from 'react';

function Button({title}) {
    return (
        <button style={{
            marginTop: '20px', backgroundColor: '#007BFF',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
        }} type='submit'>
           {title}
        </button>
    );
}

export default Button;