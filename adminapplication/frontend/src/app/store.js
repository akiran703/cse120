import { configureStore } from '@reduxjs/toolkit';
import coordReducer from '../features/coord/coordSlice'
import timeReducer from '../features/Timeauth/timeSlice'
import authReducer from '../features/auth/authSlice'
import driverReducer from '../features/check/checkSlice'
import uploadReduce from '../features/upload/uploadSlice'
import listReducer from '../features/list/listSlice'
import alltimeReducer from '../features/alltimeAuth/allSlice'
import alldriverReducer from '../features/getallDriversAuth/getdriversSlice'
import allbolReducer from '../features/allBOL/allBOLSlice'
import allPOReducer from '../features/allPO/allPOSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    coord: coordReducer,
    time: timeReducer,
    driver: driverReducer,
    list: listReducer,
    upload: uploadReduce,
    alltime:alltimeReducer,
    alldriver:alldriverReducer,
    allbol:allbolReducer,
    allpo:allPOReducer
  },
});
