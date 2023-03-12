import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/layout/Spinner'
import { reset } from '../features/auth/authSlice'
import DefaultProfile from '../assets/profile.svg'

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
            <div className='flex justify-center mb-5'>
                <img className="w-20 h-20 rounded-full flex justify-center items-center outline outline-offset-2 outline-blue-500" src={DefaultProfile} alt="profile" />
            </div>
                
            <section className="heading flex justify-center mb-5">
                <h2 className='underline text-2xl font-bold'>Profile Information</h2>
            </section>

            <section className='content mx-5 p-5 rounded-md outline outline-offset-0 outline-828282 bg-slate-200'>
                <div className='mx-2 text-black'>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            </section>

            <section className="heading flex justify-center my-5">
                <h2 className='underline text-2xl font-bold'>Subscription Information</h2>
            </section>

            <section className='content mx-5 p-5 rounded-md outline outline-offset-0 outline-828282 bg-slate-200'>
                <div className='mx-2 text-black flex flex-column justify-center'>
                    <p>Subscription Status</p>
                </div>
            </section>
        </>
    )
}

export default Profile