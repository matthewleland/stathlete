import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import playerService from './playerService'

const initialState = {
  player: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
export const getPlayerDetails = createAsyncThunk(
  'players/:id',
  async (id, thunkAPI) => {
    try {
      return await playerService.getPlayerDetails(id)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPlayerDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlayerDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.player = action.payload
      })

      .addCase(getPlayerDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = playerSlice.actions
export default playerSlice.reducer
