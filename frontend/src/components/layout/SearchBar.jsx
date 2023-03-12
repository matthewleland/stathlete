import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchPlayers } from '../../features/search/searchSlice'

function SearchBar() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(searchPlayers({ text }))
    console.log(text)
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mx-9 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar
