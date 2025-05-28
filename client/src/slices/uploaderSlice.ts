import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadFile {
    id: string;
    name: string;
    progress: number;
    // другие поля при необходимости
}

interface UploaderState {
    isVisible: boolean;
    files: UploadFile[];
}

const initialState: UploaderState = {
    isVisible: false,
    files: [],
};

const uploaderSlice = createSlice({
    name: 'uploader',
    initialState,
    reducers: {
        showUploader: (state) => {
            state.isVisible = true;
        },
        hideUploader: (state) => {
            state.isVisible = false;
        },
        addUploadFile: (state, action: PayloadAction<UploadFile>) => {
            state.files.push(action.payload);
        },
        removeUploadFile: (state, action: PayloadAction<string>) => {
            state.files = state.files.filter(file => file.id !== action.payload);
        },
        changeUploadFile: (state, action: PayloadAction<{ id: number; progress: number }>) => {
            // @ts-ignore
            const file = state.files.find(file => file.id === action.payload.id);
            if (file) {
                file.progress = action.payload.progress;
            }
        },
    },
});

export const {
    showUploader,
    hideUploader,
    addUploadFile,
    removeUploadFile,
    changeUploadFile,
} = uploaderSlice.actions;

export default uploaderSlice.reducer;
