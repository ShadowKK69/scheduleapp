const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Schedule = require("../models/scheduleModel")

// @desc   Get user schedule by his user id
// @route  GET /api/schedule/:id
// @access Private
const getSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.find({ user: req.params.id })

  if (!schedule) {
    res.status(404)
    console.log("Schedule not found")
  }

  res.status(200).json(schedule)
})

// @desc   Create new schedule
// @route  POST /api/schedule/
// @access Private
const createSchedule = asyncHandler(async (req, res) => {
  console.log("Request Params:", req.params)
  console.log("Request Body:", req.body)

  const { week } = req.body
  const userId = req.params.id

  if (!week || !userId) {
    res.status(400)
    throw new Error("Please add the correct parameters")
  }

  const schedule = await Schedule.create({
    user: userId,
    week,
  })

  await schedule.save()

  res.status(201).json(schedule)
})

// @desc   Delete schedule
// @route  DELETE /api/schedule/:id
// @access Private
const deleteSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.deleteMany({ user: req.params.id })

  if (!schedule) {
    res.status(404)
    console.log("Schedule not found")
  }

  res.status(200).json({ success: true })
})

// @desc   Update schedule
// @route  PUT /api/schedule/:id
// @access Private
const updateSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findOneAndUpdate(req.params.id, req.body)

  if (!schedule) {
    res.status(404)
    console.log("Schedule not updated")
  }

  res.status(200).json(schedule)
})

module.exports = {
  getSchedule,
  createSchedule,
  deleteSchedule,
  updateSchedule,
}
