import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {Movie} from '../../types'
import {fetchSearch} from './searchAPI'

export interface SearchState {
  query: string,
  status: 'idle' | 'loading',
  result: Movie[],
}

const initialState: SearchState = {
  query: '',
  status: 'idle',
  result: [],
}

export const searchAsync = createAsyncThunk(
  'counter/fetchCount',
  async (query: string) => {
    const response = await fetchSearch(query)
    // The value we return becomes the `fulfilled` action payload
    return response.Search
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.result = action.payload
      })
  },
})

export const {setQuery} = searchSlice.actions;

export const selectSearchQuery = (state: RootState) => state.search.query
export const selectSearchResult = (state: RootState) => state.search.result

export default searchSlice.reducer
