// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null, // Add role to the state
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            state.role = null; // Clear role when token is cleared
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem('role', action.payload); // Persist role in localStorage
        },
    },
});

export const { setToken, clearToken, setRole } = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;
