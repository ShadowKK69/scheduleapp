const express = require("express")
const router = express.Router()
const {
  getSchedule,
  createSchedule,
  deleteSchedule,
  updateSchedule,
} = require("../controllers/scheduleController")

const { protect, admin, checkUser } = require("../middleware/authMiddleware")

router
  .route("/:id")
  .get(protect, checkUser, getSchedule)
  .post(protect, admin, createSchedule)
  .delete(protect, deleteSchedule)
  .put(protect, updateSchedule)

module.exports = router
