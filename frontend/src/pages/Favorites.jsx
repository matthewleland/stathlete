import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TeamItem from '../components/layout/TeamItem'
import PlayerItem from '../components/layout/PlayerItem'
import Spinner from '../components/layout/Spinner'
import { getFavorites, reset } from '../features/favorites/favSlice'

function Favorites() {
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

    if (!user) {
      navigate('/login')
    } else {
      dispatch(getFavorites())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <header className="heading flex m-5">
        <h2 className="text-2xl font-bold">Favorites - {user.name}</h2>
      </header>

      <section className="content m-5">
        <div>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mx-4">
              {favorites.map((favorite) =>
                !favorite.details.fullName ? (
                  <TeamItem
                    key={favorite._id}
                    team={favorite.details}
                    showDelete={true}
                  />
                ) : (
                  <PlayerItem
                    key={favorite._id}
                    player={favorite.details}
                    showDelete={true}
                  />
                )
              )}
            </div>
          ) : (
            <h3>You have not added any favorites</h3>
          )}
        </div>
      </section>
    </>
  )
}

export default Favorites
