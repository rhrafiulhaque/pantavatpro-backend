import { z } from 'zod'
import { DeliveryStatus } from './order.constant'
const OrderAddZodSchema = z.object({
  body: z.object({
    tranjectionId: z.string({
      required_error: 'Image is required',
    }),
    email: z.string({
      required_error: 'price is required',
    }),
    deliveryStatus: z.enum([...DeliveryStatus] as [string, ...string[]], {
      required_error: 'Meal is required',
    }),
  }),
})

export const OrderValidation = {
  OrderAddZodSchema,
}
