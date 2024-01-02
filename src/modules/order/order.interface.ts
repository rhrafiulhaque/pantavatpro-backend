import { Model } from 'mongoose'
import { IFood } from '../food/food.interface'

export type IDeliveryStatus =
  | 'Submitted'
  | 'Processing'
  | 'Ongoing'
  | 'Delivered'

export type IOrder = {
  food_items: IFood[]
  isPaid: boolean
  tranjectionId: string
  email: string
  deliveryStatus: IDeliveryStatus
}

export type OrderModel = Model<IOrder>
