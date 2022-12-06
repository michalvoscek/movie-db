import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import favouritesReducer from '../features/favourites/favouritesSlice'
import {moviesApi} from '../features/search/moviesApi'
import {loadState} from './browserStorage'

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
