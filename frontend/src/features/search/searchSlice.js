import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import searchService from './searchService'

const initialState = {
  results: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const searchPlayers = createAsyncThunk('players/search', async (text, thunkAPI) => {
  try {
    // const token = thunkAPI.getState().auth.user.token

    return await searchService.searchPlayers(text)

  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlayers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchPlayers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.results.push(action.payload)
        console.log(action.payload)
      })
      .addCase(searchPlayers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
  }
})

export const { reset } = searchSlice.actions
export default searchSlice.reducer
