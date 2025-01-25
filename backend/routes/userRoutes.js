const express = require("express")
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  getMe,
} = require("../controllers/userController")

const { protect, admin } = require("../middleware/authMiddleware")

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/all", protect, admin, getUsers)
router.get("/me", protect, getMe)

module.exports = router
