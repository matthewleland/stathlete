import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../features/auth/authSlice'

function Recover() {

  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  })

  const { email, newPassword, confirmPassword } = formData

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
      newPassword
    }

    dispatch(resetPassword())
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
      >
        <div className="grid gap-6 mb-6 mx-6 md:grid-cols-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email..."
              value={email}
              onChange={onChange}
              required
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your new password..."
              value={newPassword}
              onChange={onChange}
              required
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm_new_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Re-enter your new password..."
              value={confirmPassword}
              onChange={onChange}
              required
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="mx-6 btn-primary focus:btn-primary-focus font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>


      </form>
    </>
  )
}

export default Recover
