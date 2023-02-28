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
                
            <section className="heading" class="flex justify-center mb-5">
                <h2 className='underline' class='text-2xl font-bold'>User Information</h2>
            </section>

            <section className='content' class='mx-5 p-5 rounded-md outline outline-offset-0 outline-828282 bg-slate-200'>
                <div class='mx-2 text-black'>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            </section>

            <section className="heading" class="flex justify-center my-5">
                <h2 className='underline' class='text-2xl font-bold'>Subscription Information</h2>
            </section>

            <section className='content' class='mx-5 p-5 rounded-md outline outline-offset-0 outline-828282 bg-slate-200'>
                <div class='mx-2 text-black flex flex-column justify-center'>
                    <p>Subscription Status</p>
                </div>
            </section>
        </>
    )
}

export default Profile