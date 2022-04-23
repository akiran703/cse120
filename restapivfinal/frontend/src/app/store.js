import { configureStore } from '@reduxjs/toolkit';
import coordReducer from '../features/coord/coordSlice'
import timeReducer from '../features/Timeauth/timeSlice'
import authReducer from '../features/auth/authSlice'
import driverReducer from '../features/check/checkSlice'
import uploadReduce from '../features/upload/uploadSlice'
import listReducer from '../features/list/listSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    coord: coordReducer,
    time: timeReducer,
    driver: driverReducer,
    list: listReducer,
    upload: uploadReduce
  },
});
