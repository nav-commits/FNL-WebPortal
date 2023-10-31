import React from 'react';
import './Button.css';

function Button({ title, onClick, type, color, marginTop, width }) {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: color,
                margin: marginTop,
                width: width
            }}
            className='buttonStyle'
            type={type}
        >
            {title}
        </button>
    );
}

export default Button;
