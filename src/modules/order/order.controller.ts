/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { RequestHandler } from 'express'
import { foodService } from '../food/food.service'
import { Order } from './order.model'
const { ObjectId } = require('mongodb')
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWORD
const is_live = false
const addOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = req.body
    const email = order.data.email
    const foods = order.cartFood
    const total_price = order.cartFood.reduce(
      (acc: number, food: { quantity: number; price: number }) => {
        const subtotal = food.quantity * food.price
        return acc + subtotal
      },
      0,
    )

    const tran_id = new ObjectId().toString()

    const data = {
      total_amount: total_price,
      currency: 'BDT',
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `http://localhost:5000/api/v1/orders/payment/success/${tran_id}`,
      // success_url: `https://kinbaanaki-backend.vercel.app/api/v1/order/payment/success/${tran_id}`,
      fail_url: 'http://localhost:3030/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: 'computer',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: order.data.name,
      cus_email: order.data.email,
      cus_add1: order.data.address,
      cus_add2: order.data.district,
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: order.data.phonenumber,
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    }

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then((apiResponse: { GatewayPageURL: any }) => {
      const GatewayPageURL = apiResponse.GatewayPageURL
      res.send({ url: GatewayPageURL })
    })

    const finalOrder = {
      food_items: foods,
      email,
      isPaid: false,
      tranjectionId: tran_id,
      deliveryStatus: 'Submitted',
    }

    Order.create(finalOrder)
  } catch (err) {
    next(err)
  }
}

const successPayment: RequestHandler = async (req, res, next) => {
  try {
    const result = await Order.updateOne(
      { tranjectionId: req.params.tranId },
      { isPaid: true },
    )

    // Check if the update operation was successful
    if (result.modifiedCount === 1) {
      // Retrieve the order details using the tranId
      const order = await Order.findOne({ tranjectionId: req.params.tranId })

      if (order) {
        // Iterate through food items in the order and update sells count and available quantity
        for (const food of order.food_items) {
          await foodService.updateSellsCount(food._id.toString(), food.quantity)
          await foodService.updateAvailabeQuantity({
            id: food._id.toString(),
            quantity: food.quantity,
          })
        }

        // Redirect to the success page
        res.redirect('http://localhost:3000/payment/success')
        // res.redirect('https://kinbaanaki.web.app/payment-success');
      } else {
        console.log('Order not found')
        res.status(404).json({ message: 'Order not found' })
      }
    } else {
      console.log('Document not found or not updated')
      // Handle the case where the document was not found or not updated.
      res.status(404).json({ message: 'Document not found' })
    }
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
  successPayment,
}
