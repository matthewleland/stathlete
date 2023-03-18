import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { GiBasketballBasket } from 'react-icons/gi'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import PropTypes from 'prop-types'

function Navbar({ title }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <GiBasketballBasket className="inline pr-2 text-5xl" />
          <Link
            to="/"
            className="text-lg font-bold align-middle"
          >
            {title}
          </Link>
        </div>
        {user ? (
          <div className="flex-1 px-2 mx-2">
            <div className="flex justify-end">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link
                    to="/"
                    className="btn btn-ghost btn-sm rounded-btn"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="btn btn-ghost btn-sm rounded-btn"
                  >
                    Search
                  </Link>
                </li>
                <li tabIndex={0}>
                  <Link
                    to="/profile"
                    className="btn btn-ghost btn-sm rounded-btn"
                  >
                    {user.name}
                  </Link>
                  <ul className="p-2 bg-base-100">
                    <li>
                      <Link
                        to="/profile"
                        className="btn btn-ghost btn-sm rounded-btn"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/favorites"
                        className="btn btn-ghost btn-sm rounded-btn"
                      >
                        Favorites
                      </Link>
                    </li>
                    <li>
                      <button
                        className="btn btn-ghost btn-sm rounded-btn"
                        onClick={onLogout}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex-1 px-2 mx-2">
            <div className="flex justify-end">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link
                    to="/login"
                    className="btn btn-ghost btn-sm rounded-btn"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="btn btn-ghost btn-sm rounded-btn"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Stathlete',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
