import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import fileReducer from '../slices/fileSlice'
import uploadReducer from '../slices/uploaderSlice'
import appReducer from '../slices/appSlice'
// ...

export const store = configureStore({
    reducer: {
        user: userReducer,
        files: fileReducer,
        upload: uploadReducer,
        app: appReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch