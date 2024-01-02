import { Order } from './order.model'

const addOrder = async (order: object) => {
  const result = await Order.create(order)
  return result
}

// const getAllFoods = async () => {
//   const result = await Food.find()
//   return result
// }
// const getFoodsByMenu = async (meal: string) => {
//   const result = await Food.find({ meal })
//   return result
// }

export const OrderService = {
  addOrder,
}
