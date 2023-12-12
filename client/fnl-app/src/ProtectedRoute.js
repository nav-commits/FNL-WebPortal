import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
