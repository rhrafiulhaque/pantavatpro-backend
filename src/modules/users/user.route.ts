import express from 'express'
import { ENUM_USER_ROLE } from '../../app/enums/user'
import auth from '../../app/middleware/auth'
import validateRequest from '../../app/middleware/validateRequest'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()
router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
)

router.get(
  '/allusers',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers,
)
router.get(
  '/get-user-by-email/:userEmail',

  UserController.getUserByEmail,
)

export const UserRoutes = router
