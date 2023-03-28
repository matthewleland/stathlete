import { useEffect } from 'react'
import { getPlayerDetails } from '../features/player/playerSlice'
import { createFavorite } from '../features/favorites/favSlice'

import { useSelector, useDispatch } from 'react-redux'

function PlayerDetails() {
  const dispatch = useDispatch()
  useEffect(() => {
    const id = window.location.pathname.slice(9)
    dispatch(getPlayerDetails(id))
  }, [])
  const { player, isLoading, isError, message } = useSelector(
    (state) => state.player
  )

  const onAddFav = (e) => {
    e.preventDefault()

    dispatch(createFavorite({ player }))
  }

  return (
    <div>
      <p>{player.fullName}</p>

      <button
        onClick={onAddFav}
        className="btn btn-primary"
      >
        Add Favorite
      </button>
    </div>
  )
}

export default PlayerDetails
