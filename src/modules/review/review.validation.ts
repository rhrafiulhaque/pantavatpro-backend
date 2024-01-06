import { z } from 'zod'
const reviewAddZodSchema = z.object({
  body: z.object({
    userEmail: z.string({
      required_error: 'userEmail is required',
    }),
    rating: z.number({
      required_error: 'rating is required',
    }),
    reviewText: z.string({
      required_error: 'reviewText is required',
    }),
  }),
})

export const reviewValidation = {
  reviewAddZodSchema,
}
