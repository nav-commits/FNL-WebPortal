import React from 'react';
import '../Input/Input.css';

function Input({ value, onChange, placeholder, onFocus }) {

    return (
        <input
            type='text'
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={onFocus}
           
            className='inputStyle'
        />
    );
}

export default Input;