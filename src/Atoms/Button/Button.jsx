import React from 'react';

function Button({ title, onClick, type, color }) {
    return (
        <button
            onClick={onClick}
            style={{
                marginTop: '20px',
                backgroundColor: color,
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
            }}
            type={type}
        >
            {title}
        </button>
    );
}

export default Button;
