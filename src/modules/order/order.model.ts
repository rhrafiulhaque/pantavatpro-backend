import { Schema, model } from 'mongoose'
import { IOrder, OrderModel } from './order.interface'

const orderSchema = new Schema<IOrder>(
  {
    food_items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Foods',
        required: true,
      },
    ],
    isPaid: {
      type: Boolean,
      default: false,
    },
    tranjectionId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      default: 'Submitted',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Order = model<IOrder, OrderModel>('Orders', orderSchema)
