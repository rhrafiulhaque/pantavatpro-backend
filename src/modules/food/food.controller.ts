import { RequestHandler } from 'express'
import pick from '../../app/shared/pick'
import { paginationFields } from '../../interface/common'
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
    const paginationOptions = pick(req.query, paginationFields)
    const result = await foodService.getAllFoods(paginationOptions)
    res.status(200).json({
      success: true,
      message: 'Food Retrived Successfully!',
      meta: result.meta,
      data: result.data,
    })
  } catch (err) {
    next(err)
  }
}
const getFoodsByMenu: RequestHandler = async (req, res, next) => {
  const { menuname } = req.params
  const paginationOptions = pick(req.query, paginationFields)
  try {
    const result = await foodService.getFoodsByMenu(menuname, paginationOptions)
    res.status(200).json({
      success: true,
      message: 'Food Retrived Successfully!',
      meta: result.meta,
      data: result.data,
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

const getSearchFood: RequestHandler = async (req, res, next) => {
  const searchKeyword = req.query.searchKeyword as string

  try {
    const result = await foodService.getSearchFood(searchKeyword)

    res.status(200).json({
      success: true,
      message: 'Searched Product Retrieve Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const updateFood: RequestHandler = async (req, res, next) => {
  try {
    const result = await foodService.updateFood(req.body)

    res.status(200).json({
      success: true,
      message: 'Update Food Successfully!',
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
  getSearchFood,
  updateFood,
}
