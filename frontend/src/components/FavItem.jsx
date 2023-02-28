import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorites/favSlice'

function FavItem({favorite, showDelete}) {
  const dispatch = useDispatch()

  // Displays each favorite along with delete button
  return (
    <div className='flex flex-row justify-between'>
      <h4 className='text-xs' class='text-base'>{favorite.text}</h4>
      {showDelete ? 
        <button onClick={() => dispatch(deleteFavorite(favorite._id))} className="close">
          <p>Delete Favorite</p>
        </button>
        :
        null
      }
    </div>
  )
}

export default FavItem