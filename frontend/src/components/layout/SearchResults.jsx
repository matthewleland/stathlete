import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './Spinner'

import { searchPlayers, reset } from '../../features/search/searchSlice'

function SearchResults() {
  const dispatch = useDispatch()

  return (
    <div>SearchResults</div>
  )
}

export default SearchResults