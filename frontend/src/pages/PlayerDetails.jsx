import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

function PlayerDetails({ player }) {
  const { players, isLoading, isError, message } = useSelector(
    (state) => state.players
  )
  console.log(players)
  return <div>{player.fullName}</div>
}

export default PlayerDetails
