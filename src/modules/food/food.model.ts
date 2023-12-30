import { Schema, model } from 'mongoose'
import { mealTitle } from './food.constant'
import { FoodModel, IFood } from './food.interface'
const foodSchema = new Schema<IFood>(
  {
    foodTitle: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    afterDiscountPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    meal: {
      type: String,
      enum: mealTitle,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sellsCount: {
      type: Number,
      default: 0,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Food = model<IFood, FoodModel>('Foods', foodSchema)
