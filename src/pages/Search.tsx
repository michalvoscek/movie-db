import {useGetSearchQuery} from '../features/search/moviesApi'
import {useSearchParams} from 'react-router-dom'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery: string = searchParams.get('s')!
  const pageQuery: string | null = searchParams.get('p')
  const page: number = Number(pageQuery) || 1
  const res = useGetSearchQuery({page: page, query: searchQuery})
  const onPageChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
    searchParams.set('p', newPage.toString())
    setSearchParams(searchParams)
  }
  if (res.isLoading) return <Typography>Loading...</Typography>
  if (res.data.Response === 'False') return <Typography>{res.data.Error}</Typography>
  console.log('res', res)
  return (
    <Container maxWidth="sm">
      <Typography>Search result</Typography>
      <List sx={{width: '100%', maxWidth: 720, bgcolor: 'background.paper'}}>
      {res.data.Search.map((movie: any, index: number) => {
        return (<>
          {index !== 0 && <Divider component="li" />}
          <ListItem alignItems="flex-start" disablePadding>
            <ListItemButton>
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
        <Pagination onChange={onPageChange} count={Math.ceil(res.data.totalResults / 10)} />
      </Stack>
    </Container>
  )
}
