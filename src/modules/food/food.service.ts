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
const updateAvailabeQuantity = async (updatefood: {
  id: string
  quantity: number
}) => {
  try {
    const food = await Food.findById(updatefood.id)
    if (!food) {
      throw new ApiError(404, 'food not found')
    }
    if (food.stock < updatefood.quantity) {
      throw new ApiError(500, 'Your Quanity is More Than Stock')
    }

    food.stock = food.stock - updatefood.quantity
    await food.save()

    return food
  } catch (err) {
    throw new ApiError(400, 'Failed to update food availableQuantity:')
  }
}

const updateSellsCount = async (foodId: string, quantity: number) => {
  try {
    const food = await Food.findById(foodId)
    if (!food) {
      throw new ApiError(404, 'Food not found')
    }

    food.sellsCount += quantity
    await food.save()

    return food
  } catch (err) {
    throw new ApiError(400, 'Failed to update food sales:')
  }
}

export const foodService = {
  addFoodItem,
  getAllFoods,
  getFoodsByMenu,
  getFoodsById,
  updateAvailabeQuantity,
  updateSellsCount,
}
