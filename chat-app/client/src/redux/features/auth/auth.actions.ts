import { axiosAuthInstance } from '@/utils/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthLoginType, KnownLoginError, LoginPayloadResponse } from '.';

export const login = createAsyncThunk<LoginPayloadResponse, AuthLoginType, { rejectValue: string }>(
   'auth/login',
   async ({ email, password }: AuthLoginType, { rejectWithValue }) => {
      try {
         const response = await axiosAuthInstance.post<LoginPayloadResponse>('/auth/login', { email, password });
         return response.data;
      } catch (err) {
         const error: AxiosError<KnownLoginError> = err as any;
         if (!error.response) {
            throw err;
         }
         return rejectWithValue(error.response?.data?.message);
      }
   }
);
