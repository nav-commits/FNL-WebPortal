import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
 const domain = process.env.REACT_APP_AUTH0_DOMAIN;
 const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Auth0Provider>
);
reportWebVitals();
