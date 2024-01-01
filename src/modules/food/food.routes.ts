import express from 'express'
import validateRequest from '../../app/middleware/validateRequest'
import { foodController } from './food.controller'
import { FoodValidation } from './food.validation'

const router = express.Router()
router.post(
  '/add-food-item',
  validateRequest(FoodValidation.foodItemAddZodSchema),
  foodController.addFoodItem,
)
router.get('/get-all-foods', foodController.getAllFoods)

export const FoodRoutes = router
