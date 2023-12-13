import React from 'react';
import './Button.css';

function Button({ title, onClick, type, color, marginTop, width, disabled, marginLeft }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={{ 
                backgroundColor: disabled? 'grey' : color,
                margin: marginTop,
                width: width,
                marginLeft: marginLeft,
            }}
            className='buttonStyle'
            type={type}
        >
            {title}
        </button>
    );
}

export default Button;
