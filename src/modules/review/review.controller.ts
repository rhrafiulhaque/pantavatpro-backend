import { RequestHandler } from 'express'
import { reviewService } from './review.service'

const addReview: RequestHandler = async (req, res, next) => {
  try {
    const result = await reviewService.addReview(req.body)
    res.status(200).json({
      success: true,
      message: 'Review Added Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getReviewsByFoodId: RequestHandler = async (req, res, next) => {
  try {
    const foodId = req.params.foodId

    const reviews = await reviewService.getReviewsByFoodId(foodId)

    res.status(200).json({
      success: true,
      data: reviews,
    })
  } catch (err) {
    next(err)
  }
}

export const reviewController = {
  addReview,
  getReviewsByFoodId,
}
