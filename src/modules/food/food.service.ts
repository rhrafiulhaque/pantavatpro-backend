import ApiError from '../../error/ApiError'
import { IPaginationOptions } from '../../interface/common'
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

const getAllFoods = async (paginationOptions: IPaginationOptions) => {
  const { page = 1, limit = 4 } = paginationOptions
  const skip = (page - 1) * limit
  const result = await Food.find().sort().skip(skip).limit(limit)
  const total = await Food.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getFoodsByMenu = async (
  meal: string,
  paginationOptions: { page?: 1 | undefined; limit?: 4 | undefined },
) => {
  const { page = 1, limit = 2 } = paginationOptions
  const skip = (page - 1) * limit
  const result = await Food.find({ meal }).sort().skip(skip).limit(limit)
  const resultOfMenu = await Food.find({ meal })
  const total = resultOfMenu.length
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getFoodsById = async (foodId: string) => {
  try {
    const result = await Food.findById(foodId)
    return result
  } catch (err) {
    throw new ApiError(400, 'Failed to get food by ID: ' + err)
  }
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

const updateFood = async (food: {
  _id: string
  foodTitle: string
  category: string
  price: number
  image: string
  description: string
  stock: number
}) => {
  const { _id, foodTitle, category, price, image, description, stock } = food
  const updateFields = {
    foodTitle,
    category,
    price,
    image,
    description,
    stock,
  }
  const result = await Food.findOneAndUpdate(
    { _id },
    { $set: updateFields },
    { new: true, upsert: true },
  )
  return result
}

const getSearchFood = async (searchKeyword: string) => {
  try {
    const regexPattern = new RegExp(searchKeyword, 'i')
    const food = await Food.find({
      $or: [
        { foodTitle: { $regex: regexPattern } },
        { category: { $regex: regexPattern } },
      ],
    })
    if (food.length === 0) {
      throw new ApiError(400, 'There are no foods matching the search criteria')
    }

    return food
  } catch (err) {
    throw new ApiError(400, 'There was a problem retrieving foods: ' + err)
  }
}

export const foodService = {
  addFoodItem,
  getAllFoods,
  getFoodsByMenu,
  getFoodsById,
  updateAvailabeQuantity,
  updateSellsCount,
  getSearchFood,
  updateFood,
}
