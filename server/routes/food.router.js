import express from "express";

import {
  addFoodItem,
  getAllFoodItems,
  deleteFoodItem,
} from "../controllers/food.controller.js";

const foodRouter = express.Router();

foodRouter.post("/foods", async (req, res) => {
  try {
    const addedFoodItem = await addFoodItem(req.body);

    if (!addedFoodItem) {
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong. Failed to add a new food item.",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully added a new food item.",
        addedFood: addedFoodItem,
      });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

foodRouter.get("/foods/:userId", async (req, res) => {
  try {
    const userId = await req.params.userId;

    const foodItems = await getAllFoodItems(userId);

    if (foodItems.length <= 0) {
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong. Failed to fetch the data.",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully fetched food items.",
        foods: foodItems,
      });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

foodRouter.delete("/foods/:foodId", async (req, res) => {
  try {
    const foodId = req.params.foodId;

    const deletedFoodItem = await deleteFoodItem(foodId);

    if (!deletedFoodItem) {
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong, Failed to remove the food item.",
        });
    }

    res.status(200).json({
      success: true,
      message: "Successfully removed food item.",
      deletedFoodItem: deletedFoodItem,
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

export default  foodRouter;
