import React from 'react';

function Button({ title, onClick, type, color, marginTop }) {
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
                width: '100px',
                margin: marginTop,
            }}
            type={type}
        >
            {title}
        </button>
    );
}

export default Button;
