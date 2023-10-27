import React from 'react';

export default function Dropdown({ data, handleNameSelect, index, nameType, activeField }) {
    console.log(activeField)
    return (
        <>
            {data.length > 0 && activeField === nameType && (
                <div style={{ width: '50%' }}>
                    <ul
                        style={{
                            listStyleType: 'none',
                            margin: 0,
                            padding: 0,
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {data.map((name, id) => (
                            <React.Fragment key={id}>
                                <li
                                    onClick={() => handleNameSelect(name.name, nameType, index)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '5px',
                                        borderBottom: '1px solid #ccc',
                                    }}
                                >
                                    {name.name}
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}