import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {Movie} from '../../types'

export interface FavouritesState {
  value: Movie[]
}

const initialState: FavouritesState = {
  value: [],
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Movie>) => {
      state.value.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((m: Movie) => m.imdbID !== action.payload)
    }
  },
});

export const {add, remove} = favouritesSlice.actions;

export const selectFavourites = (state: RootState) => state.favourites.value;

export default favouritesSlice.reducer
