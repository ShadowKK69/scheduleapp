const mongoose = require("mongoose")

const ShiftSchema = mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
})

const DayScheduleSchema = mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Ritinha",
    ],
  },
  shifts: {
    type: [ShiftSchema],
    default: [],
  },
})

const ScheduleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    week: {
      type: [DayScheduleSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Schedule", ScheduleSchema)
