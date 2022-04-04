import { configureStore } from '@reduxjs/toolkit';
import coordReducer from '../features/coord/coordSlice'
import timeReducer from '../features/Timeauth/timeSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coord: coordReducer,
    time: timeReducer
  },
});
