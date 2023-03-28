import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import PlayerSearch from './pages/PlayerSearch'
import TeamSearch from './pages/TeamSearch'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import Recover from './pages/Recover'
import PlayerDetails from './pages/PlayerDetails'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/search/players"
            element={<PlayerSearch />}
          />
          <Route
            path="/search/teams"
            element={<TeamSearch />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/favorites"
            element={<Favorites />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/recover"
            element={<Recover />}
          />
          <Route
            path="/players/:id"
            element={<PlayerDetails />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
