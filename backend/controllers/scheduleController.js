const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Schedule = require("../models/scheduleModel")

// @desc   Get user schedule
// @route  GET /api/schedule/
// @access Private
const getSchedule = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "getSchedule" })
})

// @desc   Create new schedule
// @route  POST /api/schedule/
// @access Private
const createSchedule = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "createSchedule" })
})

module.exports = {
  getSchedule,
  createSchedule,
}
