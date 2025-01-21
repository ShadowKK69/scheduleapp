const express = require("express")
const router = express.Router()
const {
  getSchedule,
  createSchedule,
} = require("../controllers/scheduleController")

const { protect } = require("../middleware/authMiddleware")

router.route("/").get(protect, getSchedule).post(protect, createSchedule)

module.exports = router
