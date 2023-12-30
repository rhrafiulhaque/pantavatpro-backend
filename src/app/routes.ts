import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { FoodRoutes } from '../modules/food/food.routes'
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
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
