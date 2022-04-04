import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import timeService from './timeService'

const initialState = {
    time: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''

}
//create new time info
export const createTime = createAsyncThunk('time/create',async(timeData,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await timeService.createTime(timeData,token)
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
// export const updateCoord = createAsyncThunk('coord/update',async(id,coordData,thunkAPI) => {
//     try{
//         return await coordService.createCoord(id,coordData)
//     }
//     catch(error)
//     {
//         const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)

//     }
// })


export const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder
        .addCase(createTime.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createTime.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.time.push(action.payload)
        })
        .addCase(createTime.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message(action.payload)
        })
    }
})
export const {reset} = timeSlice.actions
export default timeSlice.reducer
