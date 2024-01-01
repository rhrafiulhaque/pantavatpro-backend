import { z } from 'zod'
const CategoryValidationZodSchema = z.object({
  body: z.object({
    category: z.string({
      required_error: 'Category is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
})

export const CategoryValidation = {
  CategoryValidationZodSchema,
}
