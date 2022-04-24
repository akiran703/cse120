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

//get coordinates
export const getCoord = createAsyncThunk('coord/get',async(_,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await coordService.getCoord(token)
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
        const token = thunkAPI.getState().auth.user.token
        return await coordService.updateCoord(id,coordData,token)
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




//delete coordinates
export const deleteCoord = createAsyncThunk('coord/delete',async(id,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await coordService.deletecoordinates(id,token)
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
            state.message = action.payload
        })
        .addCase(getCoord.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCoord.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.locations = action.payload
        })
        .addCase(getCoord.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteCoord.pending, (state) => {
        state.isLoading = true
        })
        .addCase(deleteCoord.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.locations = state.locations.filter(
          (location) => location._id !== action.payload.id
        )
        })
        .addCase(deleteCoord.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        })
    }
})
export const {reset} = coordSlice.actions
export default coordSlice.reducer