import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getTeamDetails,
  getTeamStats,
  getTeamStandings,
} from '../features/team/teamSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/layout/Spinner'
import PlayerItem from '../components/layout/PlayerItem'
import TeamOChart from '../components/charts/team/TeamOChart'
import { createFavorite } from '../features/favorites/favSlice'
import { getPlayerStats } from '../features/player/playerSlice'
import TeamDChart from '../components/charts/team/TeamDChart'
function TeamDetails() {
  const dispatch = useDispatch()
  const { teamDetails, teamStandings, teamStats, isLoading, isError, message } =
    useSelector((state) => state.team)
  const getTeamData = async (id) => {
    await dispatch(getTeamDetails(id))
      .then(await dispatch(getTeamStandings(id)))
      .then(await dispatch(getTeamStats(id)))
  }
  useEffect(() => {
    const id = window.location.pathname.slice(7)
    getTeamData(id)
  }, [])

  const onAddFav = (e) => {
    e.preventDefault()
    console.log(teamDetails)

    dispatch(createFavorite(teamDetails))
    toast.success('New favorite added')
  }

  if (isLoading || !teamDetails.players || !teamStats || !teamStandings) {
    return <Spinner />
  }
  return (
    <div>
      {' '}
      {teamStats.length > 0 ? (
        <div>
          <div className="flex items-center mx-8 my-8">
            <div className="avatar">
              <div className="  w-24">
                <img
                  src={teamDetails.logo}
                  alt=""
                />
              </div>
            </div>
            <div className="flex-1 mx-8">
              <p className=" text-3xl mx-4 font-bold">{teamDetails.name}</p>
              <div className="stats-shadow flex flex-row m-3 bg-neutral rounded-lg">
                <div className="stat">
                  <div className="stat-title">Record (22/23)</div>
                  <div className="stat-value">
                    {teamStandings.win.total + ' - ' + teamStandings.loss.total}
                  </div>
                  <div className="stat-desc">
                    {teamStandings.win.home +
                      ' - ' +
                      teamStandings.loss.home +
                      ' at home'}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Win/Loss</div>
                  {teamStandings.win.percentage * 100 > 60 ? (
                    <div className="stat-value text-success">
                      {(teamStandings.win.percentage * 100).toFixed(2)}%
                    </div>
                  ) : teamStandings.win.percentage * 100 > 40 ? (
                    <div className="stat-value text-warning">
                      {(teamStandings.win.percentage * 100).toFixed(2)}%
                    </div>
                  ) : (
                    <div className="stat-value text-error">
                      {(teamStandings.win.percentage * 100).toFixed(2)}%
                    </div>
                  )}
                  <div className="stat-desc ">
                    Won last {teamStandings.win.lastTen}/10 games
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-figure"></div>
                  <div className="stat-title">Conf. Ranking</div>
                  {teamStandings.conference.rank < 6 ? (
                    <div className="stat-value text-success">
                      {teamStandings.conference.rank}
                    </div>
                  ) : teamStandings.conference.rank < 11 ? (
                    <div className="stat-value text-warning">
                      {teamStandings.conference.rank}
                    </div>
                  ) : (
                    <div className="stat-value text-error">
                      {teamStandings.conference.rank}
                    </div>
                  )}
                </div>
              </div>

              {/* TODO: Add more player details */}
            </div>
            <button
              onClick={onAddFav}
              className="btn btn-primary"
            >
              Add Favorite
            </button>
          </div>
          <div className="mx-8 p-4">
            <TeamOChart />
            <TeamDChart />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      <div className="flex justify-center">
        <p className=" text-3xl font-bold m-4">Active Roster</p>
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
