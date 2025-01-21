const mongoose = require("mongoose")

const scheduleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    week: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: [true, "Please specify the day of the week"],
        },
        shifts: [
          {
            start: {
              type: String,
              required: [true, "Please provide a start time"],
            },
            end: {
              type: String,
              required: [true, "Please provide an end time"],
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Schedule", scheduleSchema)
