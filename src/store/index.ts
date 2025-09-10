import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import confirmSlice from './slices/confirmSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    confirm: confirmSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
