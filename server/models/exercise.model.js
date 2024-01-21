import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
  exerciseName: String,
  durationMinutes: Number,
  caloriesBurned: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export { Exercise }