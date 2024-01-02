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
const getFoodsByMenu: RequestHandler = async (req, res, next) => {
  const { menuname } = req.params
  try {
    const result = await foodService.getFoodsByMenu(menuname)
    res.status(200).json({
      success: true,
      message: 'Food Retrived Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getFoodsById: RequestHandler = async (req, res, next) => {
  const { foodId } = req.params
  try {
    const result = await foodService.getFoodsById(foodId)
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
  getFoodsByMenu,
  getFoodsById,
}
