import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPlayerDetails,
  getPlayerStats,
} from '../features/player/playerSlice'
import { createFavorite } from '../features/favorites/favSlice'
import Spinner from '../components/layout/Spinner'
import TenGameChart from '../components/charts/player/TenGameChart'

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

    dispatch(createFavorite({ player }))
  }

  if (isLoading || !playerDetails || !playerStats) {
    return <Spinner />
  }
  return (
    <div>
      <div className="flex flex-row mx-8 my-8">
        <div className="avatar">
          <div className="rounded-full  w-24">
            <img
              src={playerDetails.imgUrl}
              alt=""
            />
          </div>
        </div>
        <div className="flex-1 mx-8">
          <p className=" text-3xl font-bold">{playerDetails.fullName}</p>
          <p className="text-xl">{playerDetails.teamName}</p>
          <p className="text-lg">Position: {playerDetails.pos}</p>
          {/* TODO: Add more player details */}
        </div>

        <button
          onClick={onAddFav}
          className="btn btn-primary"
        >
          Add Favorite
        </button>
      </div>
      {playerStats.length > 0 ? (
        <div className="overflow-x-auto m-8 rounded-md">
          <div>
            <TenGameChart />
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
              {playerStats.map((game) => (
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
              ))}
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
