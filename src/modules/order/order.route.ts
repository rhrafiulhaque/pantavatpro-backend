import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()
router.post('/add-order', orderController.addOrder)

export const OrderRoutes = router
