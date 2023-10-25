import React from 'react';

import Input from '../../Atoms/Input/Input';

const PlayerInput = ({ value, onChange, placeholder, onAdd, onRemove, checkPlayers }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ flex: 1 }}
            />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <span
                    style={{
                        cursor: 'pointer',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        fontSize: '16px',
                    }}
                    onClick={onAdd}
                >
                    <i className='fas fa-plus'></i> Add Player
                </span>
                
                <span
                    style={{
                        cursor: 'pointer',
                        backgroundColor: '#f44336',
                        color: 'white',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={onRemove}
                >
                    <i className='fas fa-times'></i>
                </span>
            </div>
        </div>
    );
};

export default PlayerInput;
