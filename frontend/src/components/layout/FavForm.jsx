import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createFavorite } from '../../features/favorites/favSlice'

function FavForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createFavorite({ text }))
    setText('')
  }

  return (
    <section className="form m-5">
      <form onSubmit={onSubmit}>
        <div className="form-group flex flex-col justify-center mb-5">
          <p>Search for your favorite teams and players!</p>
          <input
            type="text"
            name="text"
            placeholder="Search..."
            id="text"
            className="my-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            className="btn btn-block"
            type="submit"
          >
            Add Favorite
          </button>
        </div>
      </form>
    </section>
  )
}

export default FavForm
