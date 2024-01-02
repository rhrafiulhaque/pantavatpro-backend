import ApiError from '../../error/ApiError'
import { IFood } from './food.interface'
import { Food } from './food.model'

const addFoodItem = async (food: IFood) => {
  const { foodTitle } = food
  const foodExist = await Food.findOne({ foodTitle })

  if (foodExist) {
    throw new ApiError(500, 'The food is already Exist')
  } else {
    const result = await Food.create(food)
    return result
  }
}

const getAllFoods = async () => {
  const result = await Food.find()
  return result
}
const getFoodsByMenu = async (meal: string) => {
  const result = await Food.find({ meal })
  return result
}
const getFoodsById = async (foodId: string) => {
  const result = await Food.findOne({ _id: foodId })
  return result
}

export const foodService = {
  addFoodItem,
  getAllFoods,
  getFoodsByMenu,
  getFoodsById,
}
