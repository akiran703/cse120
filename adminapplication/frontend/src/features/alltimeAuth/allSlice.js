import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import allService from './allService'

const initialState = {
    alltimes: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}


export const getalltimesplease = createAsyncThunk('alltime/get',async(_,thunkAPI) => {
    try{
        return await allService.getallTimevalues()
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


export const allSlice = createSlice({
    name: 'allthetime',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder     
        .addCase(getalltimesplease.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getalltimesplease.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.alltimes = action.payload
        })
        .addCase(getalltimesplease.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
      
    }
})

export const {reset} = allSlice.actions
export default allSlice.reducer