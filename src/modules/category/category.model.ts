import { Schema, model } from 'mongoose'
import { CategoryModel, ICategory } from './category.interface'

const categorySchema = new Schema<ICategory>(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Category = model<ICategory, CategoryModel>(
  'Categories',
  categorySchema,
)
