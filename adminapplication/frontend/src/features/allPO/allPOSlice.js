import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import allPOService from "./allPOService"

const initialState = {
    allpos: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}


export const getAllPOs = createAsyncThunk('allpo/get',async(_,thunkAPI) => {
    try{
        return await allPOService.getAllPO()
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


export const allPOSlice = createSlice({
    name: 'allthepo',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder     
        .addCase(getAllPOs.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllPOs.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allpos = action.payload
        })
        .addCase(getAllPOs.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
      
    }
})

export const {reset} = allPOSlice.actions
export default allPOSlice.reducer