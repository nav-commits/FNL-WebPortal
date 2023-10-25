import React from 'react';

function Input({ value, onChange, placeholder }) {

    return (
        <input
            type='text'
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                listStyle: 'none',
                width: '300px',
                padding: '5px',
                borderLeft: 'none',
                borderRight: 'none',
                borderTop: 'none',
                borderBottom: '2px solid #ccc',
                outline: 'none',
            }}
        />
    );
}

export default Input;