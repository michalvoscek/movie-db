import {useParams} from "react-router-dom"
import {useGetDetailQuery} from '../features/search/moviesApi'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export const Detail = () => {
  const {id} = useParams()
  const res = useGetDetailQuery(id!)
  if (res.isLoading) return <Typography>Loading...</Typography>
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">{res.data.Title}</Typography>
      <img
        src={res.data.Poster}
        alt={res.data.Title}
        loading="lazy"
      />
      <Typography>{res.data.Year}</Typography>
      <Typography>{res.data.Genre}</Typography>
    </Container>
  )
}