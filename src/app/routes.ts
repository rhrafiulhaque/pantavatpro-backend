import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { categoryRoutes } from '../modules/category/category.routes'
import { FoodRoutes } from '../modules/food/food.routes'
import { OrderRoutes } from '../modules/order/order.route'
import { ReviewRoutes } from '../modules/review/review.route'
import { UserRoutes } from '../modules/users/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/foods',
    route: FoodRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
