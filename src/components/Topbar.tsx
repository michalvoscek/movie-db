import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  rigth: 0,
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: '1em',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const Topbar = () => {
  const [query, setQuery] = useState<string>('')
  const navigate = useNavigate()
  const executeSearch = () => {
    const params: URLSearchParams = new URLSearchParams()
    params.append('s', query)
    navigate(`/search?${params.toString()}`)
  }
  const onSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  const onSearchKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      executeSearch()
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Link
          to="/"
          style={{
            display:'flex',
            fontSize: 24,
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          MDb
        </Link>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{'aria-label': 'search', onKeyPress: onSearchKeyPress}}
              onChange={onSearchChange}
              value={query}
            />
            <IconButton aria-label="add" onClick={executeSearch}>
              <SearchIcon />
            </IconButton>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
