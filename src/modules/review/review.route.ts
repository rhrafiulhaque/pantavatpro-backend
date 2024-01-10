import express from 'express'
import { ENUM_USER_ROLE } from '../../app/enums/user'
import auth from '../../app/middleware/auth'
import getEmailAuth from '../../app/middleware/emailAuth'
import validateRequest from '../../app/middleware/validateRequest'
import { reviewController } from './review.controller'
import { reviewValidation } from './review.validation'

const router = express.Router()
router.post(
  '/add-review',
  validateRequest(reviewValidation.reviewAddZodSchema),
  reviewController.addReview,
)

router.get('/getReview/:foodId', reviewController.getReviewsByFoodId)
router.get(
  '/getAllReview',
  auth(ENUM_USER_ROLE.ADMIN),
  reviewController.getAllReview,
)
router.get('/getfeedback', reviewController.getFeedBack)
router.get(
  '/getReviewsByUserEmail/:email',
  getEmailAuth(),
  reviewController.getReviewsByUserEmail,
)

export const ReviewRoutes = router
