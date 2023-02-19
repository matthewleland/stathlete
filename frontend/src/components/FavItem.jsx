import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorites/favSlice'

function FavItem({favorite}) {
  const dispatch = useDispatch()

  return (
    <div className='flex flex-row'>
      <h4 className='text-xs'>{favorite.text}</h4>
      <button onClick={() => dispatch(deleteFavorite(favorite._id))} className="close"></button>
    </div>
  )
}

export default FavItem