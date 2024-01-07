import express from 'express'
import { ENUM_USER_ROLE } from '../../app/enums/user'
import auth from '../../app/middleware/auth'
import getEmailAuth from '../../app/middleware/emailAuth'
import { orderController } from './order.controller'

const router = express.Router()
router.post(
  '/add-order',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  orderController.addOrder,
)
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
router.get(
  '/getOrderListByEmail/:email',
  getEmailAuth(),
  orderController.getOrderListByEmail,
)

export const OrderRoutes = router
