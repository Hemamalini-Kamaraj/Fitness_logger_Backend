const mongoose = require("mongoose");

const userWorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  day: {
    type: Date,
    required: true,
  },
  totalDuration: {
    type: Number,
  },
  exercises: [
    {
      exercise: String,
      duration: Number,
    },
  ],
});

module.exports = mongoose.model(
  "UserWorkout",
  userWorkoutSchema,
  "userWorkouts"
);
