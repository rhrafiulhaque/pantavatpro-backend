import ApiError from '../../error/ApiError'
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
    // No existing review, proceed to create a new one
    const result = await Review.create(review)
    return result
  }
}
const getReviewsByFoodId = async (foodId: string) => {
  const reviews = await Review.find({ food: foodId })
  return reviews
}

export const reviewService = {
  addReview,
  getReviewsByFoodId,
}
