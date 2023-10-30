import React from 'react';

import Input from '../../Atoms/Input/Input';
import '../InputAndButtons/InputAndButtons.css';

const InputAndButtons = ({ value, onChange, placeholder, onAdd, onRemove, onFocus, onBlur }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ flex: 1 }}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <span className='addButton' onClick={onAdd}>
                    <i className='fas fa-plus'></i> Add Player
                </span>

                <span className='removeButton' onClick={onRemove}>
                    <i className='fas fa-times'></i>
                </span>
            </div>
        </div>
    );
};

export default InputAndButtons;
