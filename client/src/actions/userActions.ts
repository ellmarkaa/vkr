import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {IUser} from "../app/types";
import {setUser} from "../slices/userSlice"; // если экспортируешь User интерфейс

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';
const API_URL = 'http://localhost:5000/';

interface AuthResponse {
    user: IUser;
    token: string;
}

// Регистрация
export const registration = createAsyncThunk<void, { email: string; password: string }>(
    'user/registration',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}api/auth/registration`, {
                email,
                password,
            });
            alert(response.data.message);
        } catch (e: any) {
            alert(e.response?.data?.message || 'Ошибка при регистрации');
            return rejectWithValue(e.response?.data);
        }
    }
);

// Логин
export const login = createAsyncThunk<void, { email: string; password: string }>(
    'user/login',
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}api/auth/login`, {
                email,
                password,
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e: any) {
            alert(e.response?.data?.message || 'Ошибка при входе');
            return rejectWithValue(e.response?.data);
        }
    }
);

// Проверка авторизации
export const auth = createAsyncThunk<void>(
    'user/auth',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}api/auth/auth`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            localStorage.removeItem('token');
        }
    }
);

// Загрузка аватара
export const uploadAvatar = createAsyncThunk<void, File>(
    'user/uploadAvatar',
    async (file, { dispatch }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post<IUser>(
                `${API_URL}api/files/avatar`,
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch(setUser(response.data));
        } catch (e) {
            console.error('Ошибка при загрузке аватара', e);
        }
    }
);

// Удаление аватара
export const deleteAvatar = createAsyncThunk<void>(
    'user/deleteAvatar',
    async (_, { dispatch }) => {
        try {
            const response = await axios.delete<IUser>(
                `${API_URL}api/files/avatar`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch(setUser(response.data));
        } catch (e) {
            console.error('Ошибка при удалении аватара', e);
        }
    }
);
