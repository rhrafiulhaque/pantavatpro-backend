import { RequestHandler } from 'express'
import pick from '../../app/shared/pick'
import { paginationFields } from '../../interface/common'
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

const getAllReview: RequestHandler = async (req, res, next) => {
  try {
    const result = await reviewService.getAllReview()

    res.status(200).json({
      success: true,
      message: 'Reviews are  Retrived Successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getReviewsByUserEmail: RequestHandler = async (req, res, next) => {
  try {
    const email = req.params.email
    const paginationOptions = pick(req.query, paginationFields)
    const result = await reviewService.getReviewsByUserEmail(
      email,
      paginationOptions,
    )

    res.status(200).json({
      success: true,
      message: 'Reviews are  Retrived Successfully!',
      meta: result.meta,
      data: result.data,
    })
  } catch (err) {
    next(err)
  }
}

export const reviewController = {
  addReview,
  getReviewsByFoodId,
  getReviewsByUserEmail,
  getAllReview,
}
