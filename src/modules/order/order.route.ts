import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()
router.post('/add-order', orderController.addOrder)
router.post('/payment/success/:tranId', orderController.successPayment)

export const OrderRoutes = router
