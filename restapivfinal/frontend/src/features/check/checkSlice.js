import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import checkService from './checkService'

// const drivers = JSON.parse(localStorage.getItem('drivers'))


const initialState = {
    drivers: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const createDriver = createAsyncThunk('driver/create',async(driverData,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await checkService.createDriver(driverData,token)
    }
    catch(error)
    {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
})

export const updateDriver = createAsyncThunk('driver/update',async(id,driverData,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await checkService.updateDriver(id,driverData,token)    
    }
    catch(error)
    {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
})

export const getDrivers = createAsyncThunk('driver/get',async(_,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await checkService.getDrivers(token)
    }
    catch(error)
    {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
})
export const deleteDriver = createAsyncThunk(
    'driver/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await checkService.deleteDriver(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
export const checkSlice = createSlice({
    name: 'driver',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder
        .addCase(createDriver.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createDriver.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.drivers.push(action.payload)
        })
        .addCase(createDriver.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message(action.payload)
        })
        .addCase(updateDriver.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateDriver.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.drivers.push(action.payload)
        })
        .addCase(updateDriver.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getDrivers.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getDrivers.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.drivers = action.payload
        })
        .addCase(getDrivers.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteDriver.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteDriver.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.drivers = state.drivers.filter(
                (drive) => drive._id !== action.payload.id
        )
        })
        .addCase(deleteDriver.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})
export const {reset} = checkSlice.actions
export default checkSlice.reducer