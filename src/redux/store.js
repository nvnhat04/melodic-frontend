// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null, // Add role to the state
        user_id: localStorage.getItem('user_id') || null,
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
            localStorage.removeItem('user_id');
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem('role', action.payload); // Persist role in localStorage
        },
        setUserID: (state, action) => {
            state.user_id = action.payload;
            localStorage.setItem('user_id', action.payload);
        },
    },
});

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        listFavorites: [],
    },
    reducers: {
        setListFavorites: (state, action) => {
            state.listFavorites = action.payload;
        },
        removeFavorite: (state, action) => {
            const track_id = action.payload;
            if (!track_id) return; // Bỏ qua nếu track_id không hợp lệ
            state.listFavorites = state.listFavorites.filter(e => e.track_id !== track_id);
        },
        addFavorite: (state, action) => {
            state.listFavorites = [...state.listFavorites, { track_id: action.payload }];
        },
    },
});

export const { setToken, clearToken, setRole, setUserID } = authSlice.actions;
export const { setListFavorites, removeFavorite, addFavorite } = favoriteSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        favorite: favoriteSlice.reducer,
    },
});

export default store;
