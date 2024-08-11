import { createContext, useEffect, useReducer, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
// CUSTOM COMPONENT
import { MatxLoading } from 'app/components';

const initialState = {
    user: null,
    isInitialized: false,
    isAuthenticated: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { state, user } = action.payload;
            return { ...state, isAuthenticated: state, isInitialized: true, user };
        }

        case 'LOGIN': {
            return { ...state, isAuthenticated: true, user: action.payload.user };
        }

        case 'LOGOUT': {
            return { ...state, isAuthenticated: false, user: null };
        }

        case 'REGISTER': {
            const { user } = action.payload;

            return { ...state, isAuthenticated: true, user };
        }

        default:
            return state;
    }
};

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => {},
    logout: () => {},
    register: () => {}
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = async (email, password) => {
        await axios
            .post('/login', { email, password })
            .then((res) => {
                localStorage.setItem('token', res.data.token);

                const { state } = res.data;
                showSnackbar('logined succesfully!');
                const user = { name: 'admin' };
                dispatch({ type: 'LOGIN', payload: { user, state } });
            })
            .catch((err) => {
                console.log(err.response.data.message);
                if (err.response.status === 401) {
                    const errorMessage = err.response?.data?.message || 'An error occurred';
                    showSnackbar(errorMessage, 'error');
                }
            });
    };

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', { email, username, password });
        const { user } = response.data;

        dispatch({ type: 'REGISTER', payload: { user } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    // Function to handle closing the Snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Example function to show a snackbar (call this where needed)
    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    useEffect(() => {
        const state = localStorage.getItem('isAuthenticated');
        const user = { name: 'Admin' };
        dispatch({ type: 'INIT', payload: { isAuthenticated: state, user } });
        // (async () => {
        //     try {
        //         const token = localStorage.getItem('token');
        //         if (token) {
        //             await axios
        //                 .post('/relogin',{header:{
        //                     Authorization: token ? token : ''
        //                 }})
        //                 .then(() => {
        //                     const user = { name: 'admin' };
        //                     dispatch({ type: 'INIT', payload: { isAuthenticated: true, user } });
        //                 })
        //                 .catch((err) => {
        //                     console.log('logout');
        //                 });
        //         }
        //     } catch (err) {
        //         console.error(err);
        //         dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
        //     }
        // })();
    }, []);

    // SHOW LOADER
    if (!state.isInitialized) return <MatxLoading />;

    return (
        <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register }}>
            {children}
            <Snackbar
                style={{ zIndex: '100' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    );
};

export default AuthContext;
