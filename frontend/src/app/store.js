import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import favReducer from '../features/favorites/favSlice'
import searchReducer from '../features/search/searchSlice'
import playerReducer from '../features/player/playerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favReducer,
    search: searchReducer,
    player: playerReducer,
  },
})
