import axios from "axios"

const API_URL = "/api/users/all"

// Get all users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

const usersService = {
  getUsers,
}

export default usersService
