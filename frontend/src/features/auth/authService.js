import axios from 'axios'

const API_URL = '/api/users/'

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}

// send password reset email
const sendEmail = async (email) => {
  const response = await axios.post(API_URL + 'passwordReset', email)

  /*
  if (response.data) {
    
  }
  */

  return response.data
}

// reset user password
const resetPassword = async (userId, token, password) => {
  const response = await axios.post(API_URL + 'passwordReset', userId, token, password)

  /*
  if (response.data) {
    
  }
  */
 
  return response.data
}

const authService = {
  register,
  login,
  logout,
  sendEmail,
  resetPassword
}

export default authService