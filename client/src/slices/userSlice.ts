import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {registration} from "../actions/userActions";

interface User {
    id?: string;
    email?: string;
    // другие поля, если есть
}

interface UserState {
    currentUser: User;
    isAuth: boolean;
}

const initialState: UserState = {
    currentUser: {},
    isAuth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isAuth = true;
        },
        logout: (state) => {
            state.currentUser = {};
            state.isAuth = false;
        },
    },
    extraReducers: builder => {

    }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
