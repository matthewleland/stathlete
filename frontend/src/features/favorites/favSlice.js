import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import favService from './favService'

const initialState = {
  favorites: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// create new favorite
export const createFavorite = createAsyncThunk(
  'favorites/create',
  async (favData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favService.createFavorite(favData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get user favorites
export const getFavorites = createAsyncThunk(
  'favorites/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favService.getFavorites(token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// delete favorite
export const deleteFavorite = createAsyncThunk(
  'favorites/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favService.deleteFavorite(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const favSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFavorite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites.push(action.payload)
        toast('Added New Favorite!')
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites = action.payload
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites = state.favorites.filter(
          (favorite) => favorite._id !== action.payload.id
        )
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = favSlice.actions
export default favSlice.reducer
