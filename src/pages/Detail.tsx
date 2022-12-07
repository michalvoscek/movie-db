import {useParams} from "react-router-dom"
import {useGetDetailQuery} from '../features/search/moviesApi'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import StarIcon from '@mui/icons-material/Star'
import {useAppSelector, useAppDispatch} from '../app/hooks'
import {add, remove, selectFavourites} from '../features/favourites/favouritesSlice'
import {Movie} from "../types"

export const Detail = () => {
  const favourites: Movie[] = useAppSelector(selectFavourites)
  const dispatch = useAppDispatch()
  const {id} = useParams()
  const res = useGetDetailQuery(id!)
  if (res.isLoading) return <Typography>Loading...</Typography>
  if (res.data.Response === 'False') return <Typography>{res.data.Error}</Typography>
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
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}><Typography variant="h6">{data.Title}</Typography></Grid>
        <Grid item xs={6}>{
          isFavourited ?
            <IconButton aria-label="delete" onClick={() => dispatch(remove(id!))}>
              <RemoveIcon />
            </IconButton>
            :
            <IconButton aria-label="add" onClick={() => dispatch(add(thisMovie))}>
              <StarIcon />
            </IconButton>
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
        <Grid item xs={12}>
          <Typography>{data.Plot}</Typography>
        </Grid>
      </Grid>
    </>
  )
}