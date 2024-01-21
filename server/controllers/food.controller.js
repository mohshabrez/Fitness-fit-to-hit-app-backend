import { Food } from "../models/food.model.js"

async function addFoodItem(foodItemData) {
    try {
        const foodItem = new Food(foodItemData)

        const addedFoodItem = await foodItem.save()

        return addedFoodItem
    } catch (error) {
        throw error
    }
}

async function getAllFoodItems(userId) {
    try {
        const foodItems = await Food.find({ userId })
      
        return foodItems
    } catch (error) {
        throw error
    }
}

async function deleteFoodItem(foodId) {
    try {
        const deletedFoodItem = await Food.findByIdAndDelete(foodId);
      
        return deletedFoodItem
    } catch (error) {
        throw error
    }
}

export { addFoodItem, getAllFoodItems, deleteFoodItem }