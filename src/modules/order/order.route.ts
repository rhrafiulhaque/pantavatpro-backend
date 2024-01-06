import express from 'express'
import { ENUM_USER_ROLE } from '../../app/enums/user'
import auth from '../../app/middleware/auth'
import { orderController } from './order.controller'

const router = express.Router()
router.post('/add-order', orderController.addOrder)
router.post('/payment/success/:tranId', orderController.successPayment)
router.patch(
  '/update-delivery-status',
  auth(ENUM_USER_ROLE.ADMIN),
  orderController.updateDeliveryStatus,
)
router.get(
  '/getAllOrders',
  auth(ENUM_USER_ROLE.ADMIN),
  orderController.getAllOrders,
)

export const OrderRoutes = router
