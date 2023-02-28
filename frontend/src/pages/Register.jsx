import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/layout/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
     setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
     }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name, email, password
      }
      dispatch(register(userData))
    }
  }
  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
      <section className="form flex justify-center mt-10">
        <form className='flex flex-col border-2 border-neutral rounded-lg px-5' onSubmit={onSubmit}>
          <div className='text-3xl font-medium mt-5'>Create Account</div>
          <div className="form-group my-3">
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              id="name"
              name='name'
              value={name}
              placeholder="Enter name"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              id="email"
              name='email'
              value={email}
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <input
              className="input input-bordered w-full max-w-xs"
              type="password"
              id="password"
              name='password'
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <input
              className="input input-bordered w-full max-w-xs"
              type="password"
              id="password2"
              name='password2'
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3 mb-5">
            <button type='submit' className='btn btn-block'>
              Register
            </button>
          </div>
        </form>
      </section>
    </>
    )
  }
}

export default Register