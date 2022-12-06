import {useSearchParams, useNavigate} from 'react-router-dom'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import {Movie} from '../types'

export const MovieList = ({list, count}: {list: Movie[], count: number}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const pageQuery: string | null = searchParams.get('p')
  const page: number = Number(pageQuery) || 1
  const onPageChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
    searchParams.set('p', newPage.toString())
    setSearchParams(searchParams)
  }
  const onItemClick = (imdbID: string) => () => {
    navigate(`/detail/${imdbID}`)
  } 
  return (
    <>
      <List sx={{width: '100%', maxWidth: 720, bgcolor: 'background.paper'}}>
      {list.map((movie: Movie, index: number) => {
        return (<>
          {index !== 0 && <Divider key={`${movie.imdbID}_divider`} component="li" />}
          <ListItem key={movie.imdbID} alignItems="flex-start" disablePadding>
            <ListItemButton onClick={onItemClick(movie.imdbID)}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={movie.Poster} />
              </ListItemAvatar>
              <ListItemText
                primary={movie.Title}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {movie.Year}
                    </Typography>
                    {` - ${movie.Type}`}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        </>)
      })}
      </List>
      <Stack spacing={2}>
        <Pagination page={page} onChange={onPageChange} count={count} />
      </Stack>
    </>
  )
}