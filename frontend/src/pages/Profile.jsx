import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/layout/Spinner'
import { reset } from '../features/auth/authSlice'

function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
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
            <div class='flex justify-center mb-5'>
                <div class="w-20 h-20 rounded-full flex justify-center items-center outline outline-offset-2 outline-blue-500">
                    <p>Profile Pic</p>
                </div>
            </div>
                
            <section className="heading" class="flex justify-center">
                <h2 className='underline' class='text-2xl font-bold'>Profile Information</h2>
            </section>

            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        </>
    )
}

export default Profile