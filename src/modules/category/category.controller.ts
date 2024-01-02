import { RequestHandler } from 'express'
import { categoryService } from './category.service'

const addCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await categoryService.addCategory(req.body)
    res.status(200).json({
      success: true,
      message: 'Category Added Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getAllCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await categoryService.getAllCategory()
    res.status(200).json({
      success: true,
      message: 'Category Retrived Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getCategoryByName: RequestHandler = async (req, res, next) => {
  const { category } = req.params
  try {
    const result = await categoryService.getCategoryByName(category)
    res.status(200).json({
      success: true,
      message: 'Category Retrived Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const categoryController = {
  addCategory,
  getAllCategory,
  getCategoryByName,
}
