import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'

function App() {
  return (
    <>
        <Router>
          <div className="container">
            <Navbar />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/search' element={<Search />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </Router>
      <ToastContainer />
    </>
  )
}

export default App
