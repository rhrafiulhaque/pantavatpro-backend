import express from 'express'
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

export const ReviewRoutes = router
