import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DefaultProfile from '../../assets/profile.svg'
import { getPlayerDetails } from '../../features/player/playerSlice'

function PlayerItem({ player }) {
  const navigate = useNavigate()
  const IMG_URL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.playerId}.png`

  const teamId = player.teams[player.teams.length]
  console.log(teamId)
  const dispatch = useDispatch()

  const onViewDetails = (e) => {
    dispatch(getPlayerDetails(player))
  }

  return (
    <div className="flex flex-row justify-between card shadow-md compact side bg-base-200">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full  w-14 h-14">
              <img
                src={IMG_URL}
                alt="pic"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{player.fullName}</h2>
          <label
            className="text-base-content text-opacity-40"
            htmlFor="player-modal"
          >
            View Player
          </label>
        </div>
      </div>

      {/* PLAYER DETAILS MODAL */}
      <input
        type="checkbox"
        id="player-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="avatar">
            <div className="rounded-full  w-36 h-36">
              <img
                src={IMG_URL}
                alt="pic"
              />
            </div>
          </div>
          <h3 className="font-bold text-lg">{player.fullName}</h3>
          <p className="py-4">This is an example details page.</p>
          <div className="modal-action">
            <label
              htmlFor="player-modal"
              className="btn"
            >
              Exit
            </label>
            <button
              onClick={onViewDetails}
              className="btn"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerItem
