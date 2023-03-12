import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import DefaultProfile from '../assets/profile.svg'
import { createFavorite } from '../features/favorites/favSlice'

function PlayerItem({ player }) {
  const dispatch = useDispatch()

  const addFav = (e) => {
    dispatch(createFavorite(player))
    console.log(player)
  }

  return (
    <div className="flex flex-row justify-between card shadow-md compact side bg-base-100 outline">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img
                src={DefaultProfile}
                alt="profile"
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
              onClick={addFav}
              className="btn"
            >
              Add Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerItem
