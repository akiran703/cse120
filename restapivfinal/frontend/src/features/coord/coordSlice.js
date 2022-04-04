import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import coordService from './coordService'

const initialState = {
    locations: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''

}
//create new coordinates
export const createCoord = createAsyncThunk('coord/create',async(coordData,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await coordService.createCoord(coordData,token)
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


//update old coordinates
export const updateCoord = createAsyncThunk('coord/update',async(id,coordData,thunkAPI) => {
    try{
        return await coordService.createCoord(id,coordData)
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


export const coordSlice = createSlice({
    name: 'coord',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder
        .addCase(createCoord.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createCoord.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.locations.push(action.payload)
        })
        .addCase(createCoord.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message(action.payload)
        })
        .addCase(updateCoord.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateCoord.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.locations.push(action.payload)
        })
        .addCase(updateCoord.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message(action.payload)
        })
    }
})
export const {reset} = coordSlice.actions
export default coordSlice.reducer
