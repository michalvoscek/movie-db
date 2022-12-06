import {useParams} from "react-router-dom"
import {useGetDetailQuery} from '../features/search/moviesApi'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import {useAppSelector, useAppDispatch} from '../app/hooks'
import {add, remove, selectFavourites} from '../features/favourites/favouritesSlice'
import {Movie} from "../types"

export const Detail = () => {
  const favourites: Movie[] = useAppSelector(selectFavourites)
  const dispatch = useAppDispatch()
  const {id} = useParams()
  const res = useGetDetailQuery(id!)
  if (res.isLoading) return <Typography>Loading...</Typography>
  const isFavourited = favourites.some((fav: Movie) => fav.imdbID === id)
  const {data} = res
  const thisMovie: Movie = {
    Title: data.Title,
    Year: data.Year,
    imdbID: data.imdbID,
    Type: data.Type,
    Poster: data.Poster,
  }
  return (
    <Container maxWidth="sm">
      <Grid container spacing={1}>
        <Grid item xs={6}><Typography variant="h6">{data.Title}</Typography></Grid>
        <Grid item xs={6}>{
          isFavourited ?
            <div onClick={() => dispatch(remove(id!))}>-</div>
            :
            <div onClick={() => dispatch(add(thisMovie))}>*</div>
        }</Grid>
        <Grid item xs={12}>
          <img
            src={data.Poster}
            alt={data.Title}
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>{data.Year}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{data.Genre}</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}