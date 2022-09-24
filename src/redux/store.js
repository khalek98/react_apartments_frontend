import { configureStore } from '@reduxjs/toolkit';
import { apartReducer } from './Slices/apart';
import { authReducer } from './Slices/auth';

const store = configureStore({
  reducer: {
    apart: apartReducer,
    auth: authReducer,
  },
});

export default store;
