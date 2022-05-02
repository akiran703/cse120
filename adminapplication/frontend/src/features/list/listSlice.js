import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import listService from "./listService"

const initialState = {
    lists: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

// create list
export const createList = createAsyncThunk('list/create',async(listData,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await listService.createList(listData,token)
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

// update list
export const updateList = createAsyncThunk('list/update',async(id,listData,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await listService.updateList(id,listData,token)    
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

// get list
export const getLists = createAsyncThunk('list/get',async(_,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await listService.getLists(token)
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

// delete list
export const deleteList = createAsyncThunk(
    'list/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.deleteList(id, token)
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

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(Builder) =>{
        Builder
        .addCase(createList.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.lists.push(action.payload)
        })
        .addCase(createList.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message(action.payload)
        })
        .addCase(updateList.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.lists.push(action.payload)
        })
        .addCase(updateList.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message(action.payload)
        })
        .addCase(getLists.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getLists.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.lists = action.payload
        })
        .addCase(getLists.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteList.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lists = state.lists.filter(
                (list) => list._id !== action.payload.id
        )
        })
        .addCase(deleteList.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = listSlice.actions
export default listSlice.reducer