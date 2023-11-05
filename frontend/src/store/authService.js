import { login, logout } from '../store/authSlice';
import axios from 'axios';

export const checkAuthStatus = () => async (dispatch) => {
    console.log('Dispatching checkAuthStatus');
    try {
        const response = await axios.get('/api/auth/spotify/status', { withCredentials: true });
        console.log('Auth status response:', response.data);
        if (response.data.loggedIn) {
            console.log('Dispatching login action');
            dispatch(login());
        } else {
            console.log('Dispatching logout action');
            dispatch(logout());
        }
    } catch (error) {
        console.error("Status Check Failed:", error);
        dispatch(logout());
    }
};



export const performLogout = () => async (dispatch) => {
    console.log('Performing logout');
    try {
        await axios.get('http://localhost:3001/api/auth/spotify/logout', { withCredentials: true });
        dispatch(logout());
        console.log('Logout successful');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};


export const performLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/spotify';
};
