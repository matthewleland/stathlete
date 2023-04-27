import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import teamService from './teamService'

const initialState = {
  teamDetails: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getTeamDetails = createAsyncThunk(
  'teams/details/:id',
  async (id, thunkAPI) => {
    try {
      return await teamService.getTeamDetails(id)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTeamDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTeamDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.teamDetails = action.payload
      })
      .addCase(getTeamDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = teamSlice.actions
export default teamSlice.reducer
