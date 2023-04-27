import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTeamDetails, getTeamStats } from '../features/team/teamSlice'
import Spinner from '../components/layout/Spinner'
import PlayerItem from '../components/layout/PlayerItem'
import TeamOChart from '../components/charts/team/TeamOChart'
import { createFavorite } from '../features/favorites/favSlice'
import { getPlayerStats } from '../features/player/playerSlice'
import TeamDChart from '../components/charts/team/TeamDChart'
function TeamDetails() {
  const dispatch = useDispatch()
  const { teamDetails, teamStats, isLoading, isError, message } = useSelector(
    (state) => state.team
  )
  const getTeamData = async (id) => {
    await dispatch(getTeamDetails(id)).then(await dispatch(getTeamStats(id)))
  }
  useEffect(() => {
    const id = window.location.pathname.slice(7)
    getTeamData(id)
  }, [])

  const onAddFav = (e) => {
    e.preventDefault()
    console.log(teamDetails)

    dispatch(createFavorite(teamDetails))
  }

  if (isLoading || !teamDetails.players || !teamStats) {
    return <Spinner />
  }
  return (
    <div>
      {' '}
      <div className="flex flex-row mx-8 my-8">
        <div className="avatar">
          <div className="  w-24">
            <img
              src={teamDetails.logo}
              alt=""
            />
          </div>
        </div>
        <div className="flex-1 mx-8">
          <p className=" text-3xl font-bold">{teamDetails.name}</p>
          <p className="text-xl">{teamDetails.city}</p>
          {/* TODO: Add more player details */}
        </div>
        <button
          onClick={onAddFav}
          className="btn btn-primary"
        >
          Add Favorites
        </button>
      </div>
      {teamStats.length > 0 ? (
        <div>
          <TeamOChart />
          <TeamDChart />
        </div>
      ) : (
        <Spinner />
      )}
      <div className="flex justify-center">
        <p className=" text-3xl font-bold m-4">Current Roster</p>
      </div>
      {teamDetails.players.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mx-4">
          {teamDetails.players.map((player) => (
            <PlayerItem
              key={player._id}
              player={player}
            />
          ))}
        </div>
      ) : (
        <h3 className="m-8">Search for your favorite players and teams</h3>
      )}
    </div>
  )
}

export default TeamDetails
