import mongoose from 'mongoose'
import ApiError from '../../error/ApiError'
import { Food } from '../food/food.model'
import { IReview } from './review.interface'
import { Review } from './review.model'

const addReview = async (review: IReview) => {
  const { userEmail, food } = review
  console.log(userEmail, food)
  const reviewExist = await Review.findOne({ food, userEmail })
  if (reviewExist) {
    throw new ApiError(
      500,
      'The User has already submitted a review for this food.',
    )
  } else {
    const result = await Review.create(review)
    const stats = await Review.aggregate([
      {
        $match: { food: new mongoose.Types.ObjectId(food._id) },
      },
      {
        $group: {
          _id: '$food',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ])

    if (stats.length > 0) {
      await Food.findByIdAndUpdate(food._id, {
        averageRating: stats[0].avgRating,
        ratingsQuantity: stats[0].nRating,
      })
    } else {
      await Food.findByIdAndUpdate(food._id, {
        averageRating: 0,
        ratingsQuantity: 0,
      })
    }
    return result
  }
}
const getReviewsByFoodId = async (foodId: string) => {
  const reviews = await Review.find({ food: foodId })
  return reviews
}

const getAllReview = async () => {
  const reviews = await Review.find()
  return reviews
}

const getReviewsByUserEmail = async (
  email: string,
  paginationOptions: { page?: 1 | undefined; limit?: 4 | undefined },
) => {
  const { page = 1, limit = 2 } = paginationOptions
  const skip = (page - 1) * limit
  const reviews = await Review.find({ userEmail: email })
    .sort()
    .skip(skip)
    .limit(limit)
  const resultOfMenu = await Review.find({ userEmail: email })
  const total = resultOfMenu.length
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: reviews,
  }
}

export const reviewService = {
  addReview,
  getReviewsByFoodId,
  getReviewsByUserEmail,
  getAllReview,
}
