import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import allBOLService from "./allBOLService"

const initialState = {
    allbols: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}


export const getAllBOLs = createAsyncThunk('allbol/get',async(_,thunkAPI) => {
    try{
        return await allBOLService.getAllBOL()
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


export const allBOLSlice = createSlice({
    name: 'allthebol',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder     
        .addCase(getAllBOLs.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllBOLs.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allbols = action.payload
        })
        .addCase(getAllBOLs.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
      
    }
})

export const {reset} = allBOLSlice.actions
export default allBOLSlice.reducer