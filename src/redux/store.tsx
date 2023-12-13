import { configureStore } from '@reduxjs/toolkit';
import commentsSliceReducer from './commentsSlice';

const store = configureStore({
    reducer: {
        commentsSlice: commentsSliceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;

