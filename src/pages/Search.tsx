import {useGetSearchQuery} from '../features/search/moviesApi'
import {useSearchParams} from 'react-router-dom'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const res = useGetSearchQuery({page: 1, query: searchParams.get('s')!})
  return (
    <div>
      <h2>Search</h2>
      {JSON.stringify(res)}
    </div>
  )
}
