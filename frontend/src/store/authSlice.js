import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async Thunk für den Login-Prozess
export const fetchLoginStatus = createAsyncThunk(
    'auth/fetchLoginStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/spotify/status', {
                credentials: 'include',
            });
            const data = await response.json();

            if (response.ok) {
                return data.loggedIn; // Angenommen, der Endpunkt gibt { loggedIn: boolean } zurück
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState =  {
    loggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Ihre normalen Synchron-Actions
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginStatus.fulfilled, (state) => {
                state.loggedIn = true;
            })
            .addCase(fetchLoginStatus.rejected, (state) => {
                state.loggedIn = false;
                // Hier könnten Sie auch einen Error-Status oder eine Fehlermeldung im State speichern
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
