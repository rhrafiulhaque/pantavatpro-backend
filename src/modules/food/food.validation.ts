import { z } from 'zod'
import { mealTitle } from './food.constant'
const foodItemAddZodSchema = z.object({
  body: z.object({
    foodTitle: z.string({
      required_error: 'Food Title is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    meal: z.enum([...mealTitle] as [string, ...string[]], {
      required_error: 'Meal is required',
    }),
    stock: z.number({
      required_error: 'Stock is required',
    }),
  }),
})

export const FoodValidation = {
  foodItemAddZodSchema,
}
