import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import confirmSlice from './slices/confirmSlice';
import categorySlice from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    confirm: confirmSlice,
    category: categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
