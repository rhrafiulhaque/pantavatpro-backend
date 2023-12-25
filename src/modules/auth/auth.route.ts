import express from 'express'
import validateRequest from '../../app/middleware/validateRequest'
import { authController } from './auth.controller'
import { authValidation } from './auth.validation'

const router = express.Router()
router.post(
  '/login',
  validateRequest(authValidation.logInZodSchema),
  authController.logIn,
)

export const AuthRoutes = router
