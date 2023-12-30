import { RequestHandler } from 'express'
import { foodService } from './food.service'

const addFoodItem: RequestHandler = async (req, res, next) => {
  try {
    const result = await foodService.addFoodItem(req.body)
    res.status(200).json({
      success: true,
      message: 'Food Added Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getAllFoods: RequestHandler = async (req, res, next) => {
  try {
    const result = await foodService.getAllFoods()
    res.status(200).json({
      success: true,
      message: 'Food Retrived Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const foodController = {
  addFoodItem,
  getAllFoods,
}
