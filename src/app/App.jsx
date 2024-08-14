import { useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { MatxTheme } from './components';
// ALL CONTEXTS
import { AuthProvider } from './contexts/JWTAuthContext';
import SettingsProvider from './contexts/SettingsContext';
// ROUTES
import routes from './routes';
import config from '../config';
// FAKE SERVER
// import '../fake-db';

export default function App() {
    const content = useRoutes(routes);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // useEffect(() => {
    //     if (token) {
    //         console.log('here I am', token);
    //         navigate('/dashboard');
    //     }
    // }, [token]);

    return (
        <SettingsProvider>
            <AuthProvider>
                <MatxTheme>
                    <CssBaseline />
                    {content}
                </MatxTheme>
            </AuthProvider>
        </SettingsProvider>
    );
}
