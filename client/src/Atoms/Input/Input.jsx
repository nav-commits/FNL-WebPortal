import React from 'react';
import './Input.css';

function Input({ value, onChange, placeholder, onFocus, type, name }) {

    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={onFocus}

            className='inputStyle'
        />
    );
}

export default Input;