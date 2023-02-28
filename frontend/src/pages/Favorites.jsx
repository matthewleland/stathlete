import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FavForm from '../components/FavForm'
import FavItem from '../components/FavItem'
import Spinner from '../components/layout/Spinner'
import { getFavorites, reset } from '../features/favorites/favSlice'

function Favorites() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { favorites, isLoading, isError, message } = useSelector((state) => state.favorites)

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
            <section className="heading flex justify-center">
                <h2 className='underline text-2xl font-bold'>Welcome to your Favorites Page</h2>
            </section>
            
            <FavForm />

            <section className="content m-5">
                {favorites.length > 0 ? (
                <div className='favorites'>
                    {favorites.map((favorite) => (
                        <FavItem key ={favorite._id} favorite={favorite} showDelete={true} />
                    ))}
                </div>
                ) : (<h3>You have not added any favorites</h3>)}
            </section>
        </>
    )
}

export default Favorites