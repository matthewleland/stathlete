import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './Spinner'
import PlayerItem from '../PlayerItem'

import { searchPlayers, reset } from '../../features/search/searchSlice'

function SearchResults() {
  const dispatch = useDispatch()

  const { results, isLoading, isError, message } = useSelector(
    (state) => state.search
  )
  console.log(results)

  // useEffect(() => {
  //   // return () => {
  //   //   dispatch(reset())
  //   // }
  // }, [results, isLoading, isError, message, dispatch])

  return (
    <div>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mx-4">
          {results[0].map((player) => (
            <PlayerItem
              key={player._id}
              player={player}
            />
          ))}
        </div>
      ) : (
        <h3>Search for your favorite players and teams</h3>
      )}
    </div>
  )
}

export default SearchResults
