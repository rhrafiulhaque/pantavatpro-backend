import ApiError from '../../error/ApiError'
import { Food } from '../food/food.model'
import { ICategory } from './category.interface'
import { Category } from './category.model'

const addCategory = async (cat: ICategory) => {
  const { category } = cat
  const categoryExist = await Category.findOne({ category })

  if (categoryExist) {
    throw new ApiError(500, 'The Category is already Exist')
  } else {
    const result = await Category.create(cat)
    return result
  }
}

const getAllCategory = async () => {
  const result = await Category.find()
  return result
}

const getCategoryByName = async (category: string) => {
  const result = await Food.find({ category })
  return result
}

export const categoryService = {
  addCategory,
  getAllCategory,
  getCategoryByName,
}
