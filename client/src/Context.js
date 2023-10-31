import React, { useState } from 'react';

const FormDataContext = React.createContext([]);

export const FormDataProvider = ({ children }) => {
    const [formDataArray, setFormDataArray] = useState([]);

    return (
        <FormDataContext.Provider value={{ formDataArray, setFormDataArray }}>
            {children}
        </FormDataContext.Provider>
    );
};

export default FormDataContext;
