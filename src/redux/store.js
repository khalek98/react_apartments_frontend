import { configureStore } from '@reduxjs/toolkit';
import apart from './Slices/apartSlice';

export const store = configureStore({
  reducer: {
    apart,
  },
});
