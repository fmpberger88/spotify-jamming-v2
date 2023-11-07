import { logout } from './authSlice';
import axios from 'axios';




export const performLogout = () => async (dispatch) => {
    console.log('Performing logout');
    try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/spotify/logout`, { withCredentials: true });
        dispatch(logout());
        console.log('Logout successful');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};


export const performLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/spotify`;
};
