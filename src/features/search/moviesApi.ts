import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// move this
const apiKey: string = '5cebdee2'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://omdbapi.com/',
  }),
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: ({query, page}: {query: string, page: number}) => {
        const params: URLSearchParams = new URLSearchParams()
        params.append('s', query)
        params.append('apiKey', apiKey)
        params.append('page', page.toString())
        return `?${params.toString()}`
      },
    }),
    getDetail: builder.query({
      query: (query: string) => {
        const params: URLSearchParams = new URLSearchParams()
        params.append('apiKey', apiKey)
        params.append('i', query)
        return `?${params.toString()}`
      },
    }),
  }),
})

export const {useGetSearchQuery, useGetDetailQuery} = moviesApi
