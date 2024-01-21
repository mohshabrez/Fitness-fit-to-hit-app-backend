import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true
  },
  calories: Number,
  protein: Number,
  carbohydrates: Number,
  fat: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
})

const Food = mongoose.model('Food', foodSchema)

export { Food }