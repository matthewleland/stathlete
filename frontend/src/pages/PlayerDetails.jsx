import { useEffect } from 'react'
import {
  getPlayerDetails,
  getPlayerStats,
} from '../features/player/playerSlice'
import { createFavorite } from '../features/favorites/favSlice'
import Spinner from '../components/layout/Spinner'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import { useSelector, useDispatch } from 'react-redux'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function PlayerDetails() {
  const { playerDetails, playerStats, isLoading, isError, message } =
    useSelector((state) => state.player)
  const dispatch = useDispatch()
  const getPlayerData = async (id) => {
    await dispatch(getPlayerDetails(id)).then(
      await dispatch(getPlayerStats(id))
    )
  }

  let labels = []
  let datasets = []

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
          <p className="my-4 text-xl">
            Player Statistics for Season: 2022/2023
          </p>
          <table className="table w-full">
            <thead>
              {/* TODO: Add more fields for statistics table */}
              <tr>
                <th>Game ID</th>
                <th>Points</th>
                <th>Assists</th>
                <th>Rebounds</th>
              </tr>
            </thead>

            <tbody>
              {playerStats.map((game) => (
                <tr>
                  <th>{game.game.id}</th>
                  <td>{game.points}</td>
                  <td>{game.assists}</td>
                  <td>{game.totReb}</td>
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
