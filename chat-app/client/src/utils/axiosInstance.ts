import axios from 'axios';

export const axiosAuthInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
