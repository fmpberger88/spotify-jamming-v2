import { login, logout } from './authSlice';
import axios from 'axios';


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
