import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';

const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
   },
});

export default store;
