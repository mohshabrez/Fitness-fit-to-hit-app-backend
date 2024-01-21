import express from "express";

import {
  addNewGoal,
  getAllGoals,
  deleteGoal,
} from "../controllers/goal.controller.js";

const goalRouter = express.Router();

goalRouter.post("/goals", async (req, res) => {
  try {
    const addedGoal = await addNewGoal(req.body);

    if (!addedGoal) {
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong. Failed to add a new goal.",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully added a new goal.",
        addedGoal: addedGoal,
      });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

goalRouter.get("/goals/:userId", async (req, res) => {
  try {
    const userId = await req.params.userId;

    const goals = await getAllGoals(userId);

    if (goals.length <= 0) {
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong. Failed to fetch the goals.",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully fetched the goals.",
        goals: goals,
      });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

goalRouter.delete("/goals/:goalId", async (req, res) => {
  try {
    const goalId = req.params.goalId;

    const deletedGoal = await deleteGoal(goalId);

    if (!deletedGoal) {
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong. Failed to delete the goal.",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully deleted the goal.",
        deletedGoal: deletedGoal,
      });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

export default  goalRouter;
