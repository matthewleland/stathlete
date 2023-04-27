import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FavForm from '../components/layout/FavForm'
import FavItem from '../components/layout/FavItem'
import Spinner from '../components/layout/Spinner'
import { getFavorites, reset } from '../features/favorites/favSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { favorites, isLoading, isError, message } = useSelector(
    (state) => state.favorites
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (user === null) {
      navigate('/login')
    } else {
      dispatch(getFavorites())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading || !user) {
    return <Spinner />
  }
  return (
    <>
      <header className="heading flex m-5">
        <h2 className="text-2xl font-bold">Dashboard - {user.name}</h2>
      </header>

      <div>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mx-4">
            {favorites.map((favorite) => (
              <FavItem
                key={favorite._id}
                favorite={favorite}
              />
            ))}
          </div>
        ) : (
          <h3>You have not added any favorites</h3>
        )}
      </div>
    </>
  )
}

export default Dashboard
