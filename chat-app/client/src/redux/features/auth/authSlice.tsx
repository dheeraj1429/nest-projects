import { createSlice } from '@reduxjs/toolkit';
import { login } from './auth.actions';
import { StateInterface } from '.';

const INITALSTATE: StateInterface = {
   auth: null,
   authLoading: false,
   authError: null,
};

export const authSlice = createSlice({
   name: 'auth',
   initialState: INITALSTATE,
   reducers: {},
   extraReducers: (bulder) => {
      bulder
         .addCase(login.pending, (state) => {
            state.auth = null;
            state.authLoading = true;
            state.authError = null;
         })
         .addCase(login.rejected, (state, action) => {
            state.auth = null;
            state.authLoading = false;
            state.authError = action.payload;
         })
         .addCase(login.fulfilled, (state, action) => {
            console.log(action);
            state.auth = action.payload;
            state.authLoading = false;
            state.authError = null;
         });
   },
});
