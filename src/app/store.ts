import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import favouritesReducer from '../features/favourites/favouritesSlice'
import searchReducer from '../features/search/searchSlice'
import {loadState} from './browserStorage'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    favourites: favouritesReducer,
    search: searchReducer,
  },
  preloadedState: loadState()
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
