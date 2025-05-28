import { createSlice } from '@reduxjs/toolkit';

interface IAppState {
    loader: boolean;
}

const initialState: IAppState = {
    loader: false,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        showLoader: (state) => {
            state.loader = true;
        },
        hideLoader: (state) => {
            state.loader = false;
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;