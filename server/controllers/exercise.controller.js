import { Exercise } from '../models/exercise.model.js'

async function addExercise(exerciseData) {
  try {
    const exercise = new Exercise(exerciseData)

    const createdExercise = await exercise.save()

    return createdExercise
  } catch (error) {
    throw error
  }
}

async function getAllExercises(userId) {
  try {
    const exercises = await Exercise.find({ userId })

    return exercises
  } catch (error) {
    throw error
  }
}

async function deleteExercise(exerciseId) {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId)

    return deletedExercise
  } catch (error) {
    throw error
  }
}

export { addExercise, getAllExercises, deleteExercise }