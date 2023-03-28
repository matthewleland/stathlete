import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchPlayers, reset } from '../../features/search/searchSlice'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const { results, isLoading, isError, message } = useSelector(
    (state) => state.search
  )

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = async (e) => {
    console.log(window.location.pathname)
    dispatch(reset())
    e.preventDefault()
    window.location.pathname === '/search/players'
      ? dispatch(searchPlayers({ text }))
      : console.log('Search teams')
    console.log(text)
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mx-9 mb-8 gap-8">
      <div>
        {window.location.pathname === '/search/players' ? (
          <div className="tabs tabs-boxed my-4">
            <button className="player-tab tab tab-active mx-auto ">
              Players
            </button>
            <Link
              to="/search/teams"
              className="team-tab tab mx-auto"
            >
              Teams
            </Link>
          </div>
        ) : (
          <div className="tabs tabs-boxed my-4">
            <Link
              to="/search/players"
              className="team-tab tab mx-auto"
            >
              Players
            </Link>
            <button className="player-tab tab tab-active mx-auto ">
              Teams
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pr-40 bg-gray-200 input input-lg rounded-full text-black"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-full rounded-l-none w-24 sm:w-36 btn btn-lg"
              >
                <FaSearch size={25} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar
