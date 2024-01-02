import { RequestHandler } from 'express'
import { OrderService } from './order.service'

const addOrder: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)

    const result = await OrderService.addOrder(req.body)
    res.status(200).json({
      success: true,
      message: 'Order Added Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
// const getAllFoods: RequestHandler = async (req, res, next) => {
//   try {
//     const result = await foodService.getAllFoods()
//     res.status(200).json({
//       success: true,
//       message: 'Food Retrived Successfully!',
//       data: result,
//     })
//   } catch (err) {
//     next(err)
//   }
// }

export const orderController = {
  addOrder,
}
