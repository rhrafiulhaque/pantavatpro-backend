import { Model, Types } from 'mongoose'
export type IMealTitle = 'Breakfast' | 'Launch' | 'Dinner' | 'Snacks' | 'Others'

export type IFood = {
  foodTitle: string
  category: string
  price: number
  description: string
  image: string
  discount: number
  afterDiscountPrice: number
  meal: IMealTitle
  averageRating: number
  ratingsQuantity: number
  reviewList?: Types.ObjectId //ReviewInterface will be added
  stock: number
  sellsCount: number
  isTrending: boolean
}

export type FoodModel = Model<IFood>
