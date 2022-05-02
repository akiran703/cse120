import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import getdriversService from './getdriversService'

const initialState = {
    alldrivers: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}


export const getalldriversplease = createAsyncThunk('alldriver/get',async(_,thunkAPI) => {
    try{
        return await getdriversService.getalldrivervalues()
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


export const getdriversSlice = createSlice({
    name: 'allthedriver',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder     
        .addCase(getalldriversplease.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getalldriversplease.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.alldrivers = action.payload
        })
        .addCase(getalldriversplease.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
      
    }
})

export const {reset} = getdriversSlice.actions
export default getdriversSlice.reducer