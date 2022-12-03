import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import favouritesReducer from '../features/favourites/favouritesSlice'
//import searchReducer from '../features/search/searchSlice'
import {moviesApi} from '../features/search/moviesApi'
import {loadState} from './browserStorage'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
