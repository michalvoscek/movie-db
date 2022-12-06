import {useSearchParams} from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import {useGetSearchQuery} from '../features/search/moviesApi'
import {MovieList} from '../components/MovieList'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const searchQuery: string = searchParams.get('s')!
  const pageQuery: string | null = searchParams.get('p')
  const page: number = Number(pageQuery) || 1
  const res = useGetSearchQuery({page: page, query: searchQuery})
  if (res.isLoading) return <Typography>Loading...</Typography>
  if (res.data.Response === 'False') return <Typography>{res.data.Error}</Typography>
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Search result</Typography>
      <MovieList list={res.data.Search} count={Math.ceil(res.data.totalResults / 10)} />
    </Container>
  )
}
