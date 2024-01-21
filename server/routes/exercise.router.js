import express from "express";

import {
  addExercise,
  getAllExercises,
  deleteExercise,
} from "../controllers/exercise.controller.js";

const exerciseRouter = express.Router();

exerciseRouter.post("/exercises", async (req, res) => {
  try {
    const createdExercise = await addExercise(req.body);

    if (!createdExercise) {
      res.status(500).json({
        success: false,
        message: "Failed to create Exercise",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully created new exercise",
      createdExercise: createdExercise,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

exerciseRouter.get("/exercises/:userId", async (req, res) => {
  try {
    const userId = await req.params.userId;

    const exercises = await getAllExercises(userId);

    if (exercises.length <= 0) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch Exercises",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched all exercises.",
      exercises: exercises,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

exerciseRouter.delete("/exercises/:exerciseId", async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;

    const deletedExercise = await deleteExercise(exerciseId);

    if (!deletedExercise) {
      res.status(500).json({
        success: false,
        message: "Something went wrong. Exercise deletion failed.",
      });
    }

    res.status(200).json({
      success: true,
      status: 204,
      message: "Successfully deleted exercise.",
      deletedExercise: deletedExercise,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

export default  exerciseRouter
