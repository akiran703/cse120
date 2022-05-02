import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import uploadService from "./uploadService"

const initialState = {
    uploads: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

// create BOL upload
export const createUpload = createAsyncThunk('upload/create',async(uploadData,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await uploadService.createUpload(uploadData,token)
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

// update BOL upload
export const updateUpload = createAsyncThunk('upload/update',async(id,uploadData,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await uploadService.updateUpload(id,uploadData,token)    
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

// get BOL upload
export const getUploads = createAsyncThunk('upload/get',async(_,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await uploadService.getUploads(token)
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

// delete BOL upload
export const deleteUpload = createAsyncThunk(
    'upload/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await uploadService.deleteUpload(id, token)
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

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder
        .addCase(createUpload.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createUpload.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.uploads.push(action.payload)
        })
        .addCase(createUpload.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message(action.payload)
        })
        .addCase(updateUpload.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateUpload.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.uploads.push(action.payload)
        })
        .addCase(updateUpload.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message(action.payload)
        })
        .addCase(getUploads.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getUploads.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.uploads = action.payload
        })
        .addCase(getUploads.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteUpload.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteUpload.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.uploads = state.uploads.filter(
                (upload) => upload._id !== action.payload.id
        )
        })
        .addCase(deleteUpload.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = uploadSlice.actions
export default uploadSlice.reducer