import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getPlayerDetails,
  getPlayerStats,
} from '../features/player/playerSlice'
import { createFavorite } from '../features/favorites/favSlice'
import Spinner from '../components/layout/Spinner'
import { GiBasketballBall } from 'react-icons/gi'
import { toast } from 'react-toastify'
import TenGameOChart from '../components/charts/player/TenGameOChart'

function PlayerDetails() {
  const { playerDetails, playerStats, isLoading, isError, message } =
    useSelector((state) => state.player)
  const dispatch = useDispatch()
  const getPlayerData = async (id) => {
    await dispatch(getPlayerDetails(id)).then(
      await dispatch(getPlayerStats(id))
    )
  }

  useEffect(() => {
    const id = window.location.pathname.slice(9)
    getPlayerData(id)
  }, [])

  const onAddFav = (e) => {
    e.preventDefault()
    console.log(playerDetails)
    dispatch(createFavorite(playerDetails))
    toast.success('New favorite added')
  }

  if (isLoading || !playerDetails || !playerStats) {
    return <Spinner />
  }
  return (
    <div>
      <div className="flex items-center mx-8 my-8">
        <div className="avatar">
          <div className="rounded-full  w-24">
            <img
              src={playerDetails.imgUrl}
              alt=""
            />
          </div>
        </div>
        <div className="flex-1 mx-8">
          <div className="mx-4">
            <p className="text-3xl font-bold">{playerDetails.fullName}</p>
            <Link
              to={`/teams/${playerDetails.teamId}`}
              className="hover:underline text-xl"
            >
              {playerDetails.teamName}
            </Link>
          </div>
          <div className="stats-shadow flex flex-row m-3 bg-neutral rounded-lg">
            <div className="stat">
              <div className="stat-title">Position</div>
              <div className="stat-value">{playerDetails.pos}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Height</div>
              <div className="stat-value">
                {playerDetails.heightFeet}' {playerDetails.heightInches}"
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Weight</div>
              <div className="stat-value">
                {playerDetails.weightPounds} lbs.
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onAddFav}
          className="align-content-center btn btn-primary"
        >
          Add Favorite
        </button>
      </div>
      {playerStats.length > 0 ? (
        <div className="overflow-x-auto mx-8 rounded-md">
          <div className="mx-8 p-4">
            <TenGameOChart />
          </div>
          <p className="my-4 text-xl">
            Player Statistics for Season: 2022/2023
          </p>
          <table className="table w-full">
            <thead>
              {/* TODO: Add more fields for statistics table */}
              <tr>
                <th>Game ID</th>
                <th>Points</th>
                <th>FG%</th>
                <th>Assists</th>
                <th>Rebounds</th>
                <th>Blocks</th>
                <th>Steals</th>
                <th>Turnovers</th>
                <th>Fouls</th>
                <th>Minutes</th>
              </tr>
            </thead>

            <tbody>
              {playerStats
                .map((game) => (
                  <tr key={game.game.id}>
                    <th>{game.game.id}</th>
                    <td>{game.points}</td>
                    <td>{game.fgp}</td>
                    <td>{game.assists}</td>
                    <td>{game.totReb}</td>
                    <td>{game.blocks}</td>
                    <td>{game.steals}</td>
                    <td>{game.turnovers}</td>
                    <td>{game.pFouls}</td>
                    <td>{game.min}</td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default PlayerDetails
