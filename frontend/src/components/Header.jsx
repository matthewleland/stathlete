import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

function Header() {
  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>Stathlete</Link>
      </div>
      <ul>
        <li>
          <Link t='/login'>
            <FaSignInAlt />Login
          </Link>
        </li>
        <li>
          <Link t='/register'>
            <FaUser />Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header