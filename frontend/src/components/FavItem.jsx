import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorites/favSlice'
import { Link } from 'react-router-dom'
import DefaultProfile from '../assets/profile.svg'

function FavItem({ favorite, showDelete }) {
  const dispatch = useDispatch()

  // Displays each favorite along with delete button
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="card shadow-md compact side bg-base-100">
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
              <h2 className="card-title">{favorite.text}</h2>
              <Link
                className="text-base-content text-opacity-40"
                to=""
              >
                View Player
              </Link>
            </div>
          </div>
        </div>
        {showDelete ? (
          <button
            onClick={() => dispatch(deleteFavorite(favorite._id))}
            className="close"
          >
            <p className="text-red-500">Delete Favorite</p>
          </button>
        ) : null}
      </div>
    </>
  )
}

export default FavItem
