import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import PlayerItem from '../layout/PlayerItem'

import { searchPlayers, reset } from '../../features/search/searchSlice'

function SearchResults() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { results, isLoading, isError, message } = useSelector(
    (state) => state.search
  )
  console.log(results)

  useEffect(() => {
    // dispatch(reset())
  }, [results, isLoading, isError, message, dispatch])
  useEffect(() => {
    dispatch(reset())
  }, [navigate])

  return (
    <div>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mx-4">
          {results[0]
            .map((player) => (
              <PlayerItem
                key={player._id}
                player={player}
              />
            ))
            .sort()}
        </div>
      ) : (
        <h3 className="m-8">Search for your favorite players and teams</h3>
      )}
    </div>
  )
}

export default SearchResults
