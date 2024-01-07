import express from 'express'
import { ENUM_USER_ROLE } from '../../app/enums/user'
import auth from '../../app/middleware/auth'
import validateRequest from '../../app/middleware/validateRequest'
import { foodController } from './food.controller'
import { FoodValidation } from './food.validation'

const router = express.Router()
router.post(
  '/add-food-item',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FoodValidation.foodItemAddZodSchema),
  foodController.addFoodItem,
)
router.patch(
  '/updateFood',
  auth(ENUM_USER_ROLE.ADMIN),
  foodController.updateFood,
)
router.get('/get-all-foods', foodController.getAllFoods)
router.get('/getfoodsbymenu/:menuname', foodController.getFoodsByMenu)
router.get('/getfoodsbyid/:foodId', foodController.getFoodsById)
router.get('/getsearchfood/:searchKeyword', foodController.getSearchFood)

export const FoodRoutes = router
