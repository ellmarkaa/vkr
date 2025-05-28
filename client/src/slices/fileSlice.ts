import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileItem {
    _id: string;
    name: string;
    // другие поля при необходимости
}

interface FileState {
    files: FileItem[];
    currentDir: string | null;
    popupDisplay: string;
    dirStack: string[];
    view: 'list' | 'plate';
}

const initialState: FileState = {
    files: [],
    currentDir: null,
    popupDisplay: 'none',
    dirStack: [],
    view: 'list',
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<FileItem[]>) => {
            state.files = action.payload;
        },
        setCurrentDir: (state, action: PayloadAction<string | null>) => {
            state.currentDir = action.payload;
        },
        addFile: (state, action: PayloadAction<FileItem>) => {
            state.files.push(action.payload);
        },
        setPopupDisplay: (state, action: PayloadAction<string>) => {
            state.popupDisplay = action.payload;
        },
        pushToStack: (state, action: PayloadAction<string>) => {
            state.dirStack.push(action.payload);
        },
        deleteFileAction: (state, action: PayloadAction<string>) => {
            state.files = state.files.filter(file => file._id !== action.payload);
        },
        setFileView: (state, action: PayloadAction<'list' | 'plate'>) => {
            state.view = action.payload;
        },
    },
});

export const {
    setFiles,
    setCurrentDir,
    addFile,
    setPopupDisplay,
    pushToStack,
    deleteFileAction,
    setFileView,
} = fileSlice.actions;

export default fileSlice.reducer;