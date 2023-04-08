import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/layout/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      dispatch(reset())
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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
        <section className="form flex justify-center mt-10">
          <form
            className="flex flex-col border-2 border-neutral rounded-lg px-5 "
            onSubmit={onSubmit}
          >
            <div className="text-3xl font-medium mt-5">Sign In</div>
            <div className="form-group my-3">
              <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                id="email"
                name="email"
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
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>
            <div className="form-group my-3 mb-5">
              <button
                type="submit"
                className="btn btn-block"
              >
                Login
              </button>
            </div>
            <div className="my-2`">
              <Link to="/request">Forgot Password?</Link>
            </div>
            <button className="btn btn-primary">Button</button>
          </form>
        </section>
      </>
    )
  }
}

export default Login
