import mongoose, { Model } from 'mongoose'

export type IDeliveryStatus =
  | 'Submitted'
  | 'Processing'
  | 'Ongoing'
  | 'Delivered'

export type ICartFood = {
  _id: mongoose.Types.ObjectId
  foodTitle: string
  quantity: number
  price: number
}

export type IOrder = {
  food_items: ICartFood[]
  isPaid: boolean
  tranjectionId: string
  email: string
  deliveryStatus: IDeliveryStatus
}

export type OrderModel = Model<IOrder>
