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

export const foodService = {
  addFoodItem,
  getAllFoods,
}
