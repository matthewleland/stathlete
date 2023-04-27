import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteFavorite } from '../../features/favorites/favSlice'
import DefaultProfile from '../../assets/profile.svg'
import { BsTrashFill } from 'react-icons/bs'
import { toast } from 'react-toastify'

function PlayerItem({ player, showDelete }) {
  const dispatch = useDispatch()
  const IMG_URL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.playerId}.png`

  return (
    <div className="flex flex-row justify-between card shadow-md compact side bg-base-200">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full  w-14 h-14">
              <img
                src={player.imgUrl}
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{player.fullName}</h2>
          <Link
            className="text-base-content text-opacity-40"
            to={`/players/${player.id}`}
          >
            View Player
          </Link>
        </div>
      </div>
      {showDelete ? (
        <button
          onClick={() => toast.warning('Cannot delete: feature in development')}
          className="close"
        >
          <BsTrashFill className="text-4xl mx-5 fill-error" />
        </button>
      ) : null}
    </div>
  )
}

export default PlayerItem
