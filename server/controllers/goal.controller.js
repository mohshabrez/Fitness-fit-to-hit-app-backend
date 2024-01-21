import { Goal } from "../models/goal.model.js"

async function addNewGoal(goalData) {
  try {
    const goal = new Goal(goalData)

    const addedGoal = await goal.save()

    return addedGoal
  } catch (error) {
    throw error
  }
}

async function getAllGoals(userId) {
  try {
    const goals = await Goal.find({ userId });

    return goals
  } catch (error) {
    throw error
  }
}

async function deleteGoal(goalId) {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(goalId);

    return deletedGoal
  } catch (error) {
    throw error
  }
}

export { addNewGoal, getAllGoals, deleteGoal }