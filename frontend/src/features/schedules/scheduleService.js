import axios from "axios"

const API_URL = "/api/schedule"

// Create new schedule
const createSchedule = async (scheduleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, scheduleData, config)

  return response.data
}

const getSchedule = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/${userId}`, config)

  return response.data
}

const scheduleService = {
  createSchedule,
  getSchedule,
}

export default scheduleService
