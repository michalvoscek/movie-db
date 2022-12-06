import {useSearchParams} from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {useAppSelector} from '../app/hooks'
import {selectFavourites} from '../features/favourites/favouritesSlice'
import {MovieList} from '../components/MovieList'
import {Movie} from "../types"

export const Home = () => {
  const favourites: Movie[] = useAppSelector(selectFavourites)
  const [searchParams] = useSearchParams()
  const pageQuery: string | null = searchParams.get('p')
  const page: number = Number(pageQuery) || 1
  const pageList: Movie[] = favourites.slice((page - 1) * 10,(page - 1) * 10 + 10)
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Favourites</Typography>
      <MovieList list={pageList} count={Math.ceil(favourites.length / 10)} />
    </Container>
  )
}
